import 'dotenv/config';
import pg from 'pg';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error(
        'DATABASE_URL environment variable is missing. Please define it in your .env file.'
    );
}

const { Pool } = pg;

const sslConfig =
    process.env.DB_SSL === 'false'
        ? false
        : { rejectUnauthorized: false };

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: sslConfig,
});

pool.on('error', (err) => {
    console.error(
        'Unexpected error on idle PostgreSQL client:',
        err.message
    );
});

export default pool;
export { pool };