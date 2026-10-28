import 'dotenv/config';
import pool from '../src/config/db.js';

async function checkDatabaseConnection() {
    console.log('Connecting to PostgreSQL database...');

    try {
        const client = await pool.connect();
        try {
            const res = await client.query('SELECT current_database(), current_user, version()');
            const row = res.rows[0];
            console.log('PostgreSQL connection successful!');
            console.log(`Connected Database : ${row.current_database}`);
            console.log(`Connected User     : ${row.current_user}`);
            console.log(`PostgreSQL Version : ${row.version.split(' on ')[0]}`);
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Database connection failed!');
        console.error(`Error: ${err.message}`);
        console.error('Troubleshooting Guidance:');
        console.error('1. Verify PostgreSQL is running and accepting TCP connections.');
        console.error('2. Confirm the host, port, user, and database in DATABASE_URL in .env.');
        console.error('3. Verify that the user has connection privileges on the target database.');
        console.error('4. Ensure passwords with special characters are properly URL-encoded if using a connection string.');
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

checkDatabaseConnection();
