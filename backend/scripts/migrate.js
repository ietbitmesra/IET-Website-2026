import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runMigrations() {
    console.log('Starting database migrations...');

    // Locate migrations directory
    const candidateDirs = [
        path.join(__dirname, '..', 'migrations'),
        path.join(__dirname, 'migrations'),
        path.join(process.cwd(), 'migrations'),
    ];

    const migrationsDir = candidateDirs.find((dir) => fs.existsSync(dir));

    if (!migrationsDir) {
        throw new Error(
            `Migrations directory not found. Looked in: ${candidateDirs.join(', ')}`
        );
    }

    console.log(`Using migrations directory: ${migrationsDir}`);

    const client = await pool.connect();
    try {
        // 1. Ensure the schema_migrations tracking table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.schema_migrations (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                applied_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // 2. Fetch all previously applied migrations
        const appliedRes = await client.query(
            'SELECT name FROM public.schema_migrations ORDER BY id ASC'
        );
        const appliedSet = new Set(appliedRes.rows.map((row) => row.name));

        // 3. Read and sort numbered migration files strictly
        const allFiles = fs.readdirSync(migrationsDir);
        const migrationFiles = allFiles
            .filter((file) => /^\d+.*\.sql$/.test(file))
            .sort((a, b) =>
                a.localeCompare(undefined, { numeric: true, sensitivity: 'base' })
            );

        if (migrationFiles.length === 0) {
            console.log('No migration SQL files found to process.');
            return;
        }

        let appliedCount = 0;
        let skippedCount = 0;

        for (const file of migrationFiles) {
            // Path safety check: ensure strictly inside migrationsDir
            const safePath = path.resolve(migrationsDir, path.basename(file));
            if (!safePath.startsWith(path.resolve(migrationsDir))) {
                throw new Error(`Untrusted migration file path: ${file}`);
            }

            if (appliedSet.has(file)) {
                console.log(`[SKIP] Already applied: ${file}`);
                skippedCount++;
                continue;
            }

            const sqlContent = fs.readFileSync(safePath, 'utf8');

            // Detect any tables declared in this migration that already exist in the database
            // but are not recorded in schema_migrations (partial application / mismatch)
            const tableMatches = [
                ...sqlContent.matchAll(
                    /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?:public\.)?([a-zA-Z0-9_]+)/gi
                ),
            ];
            const declaredTables = [...new Set(tableMatches.map((m) => m[1]))];

            if (declaredTables.length > 0) {
                const checkRes = await client.query(
                    `
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' 
                      AND table_name = ANY($1::text[])
                    `,
                    [declaredTables]
                );

                if (checkRes.rows.length > 0) {
                    const existing = checkRes.rows.map((r) => r.table_name);
                    throw new Error(
                        `Migration state mismatch on "${file}": Table(s) [${existing.join(', ')}] already exist in public schema, but migration is not recorded in schema_migrations. Aborting migration to avoid corrupted state.`
                    );
                }
            }

            console.log(`[MIGRATE] Applying migration: ${file}...`);

            // Execute migration and recording within a single atomic transaction
            try {
                await client.query('BEGIN');
                await client.query(sqlContent);
                await client.query(
                    'INSERT INTO public.schema_migrations (name) VALUES ($1)',
                    [file]
                );
                await client.query('COMMIT');
                console.log(`[SUCCESS] Successfully applied: ${file}`);
                appliedCount++;
            } catch (migrationErr) {
                await client.query('ROLLBACK');
                throw new Error(
                    `Failed to apply migration "${file}": ${migrationErr.message}`
                );
            }
        }

        console.log('----------------------------------------');
        console.log(
            `Migration completed: ${appliedCount} applied, ${skippedCount} skipped.`
        );
        console.log('----------------------------------------');
    } finally {
        client.release();
    }
}

runMigrations()
    .catch((err) => {
        console.error('----------------------------------------');
        console.error('❌ Migration execution failed!');
        console.error(`Error: ${err.message}`);
        console.error('----------------------------------------');
        process.exitCode = 1;
    })
    .finally(async () => {
        await pool.end();
    });
