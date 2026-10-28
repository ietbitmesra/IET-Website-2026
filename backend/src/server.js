import "dotenv/config";
import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log(`IET Coding Club API running on port ${PORT}`);
});

function shutdown() {
    server.close(async () => {
        try {
            await pool.end();
        } catch (err) {
            console.error('Error closing database pool:', err.message);
        } finally {
            process.exit(0);
        }
    });
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);