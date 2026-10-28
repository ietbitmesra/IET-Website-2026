import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import cors from 'cors';
import helmet from 'helmet';

import pool from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.disable('x-powered-by');
app.use(helmet());

const isProduction = process.env.NODE_ENV === 'production';

if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET must be configured');
}

if (isProduction && process.env.SESSION_SECRET.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters long in production');
}

if (isProduction && !process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL must be configured in production');
}

app.set('trust proxy', isProduction ? 1 : false);

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((url) => url.trim().replace(/\/+$/, ''))
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const normalizedOrigin = origin.replace(/\/+$/, '');
        if (allowedOrigins.includes(normalizedOrigin)) {
            return callback(null, true);
        }
        return callback(null, false);
    },
    credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'IET Coding Club API is running',
    });
});

const PgSession = connectPgSimple(session);
const sessionStore = new PgSession({
    pool,
    tableName: 'admin_sessions',
    schemaName: 'public',
    createTableIfMissing: false,
});

sessionStore.on('error', (err) => {
    console.error('Session store error:', err.message);
});

const cookieSameSite = process.env.COOKIE_SAME_SITE || 'lax';

app.use(session({
    name: 'connect.sid',
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: isProduction,
        sameSite: cookieSameSite,
        maxAge: 8 * 60 * 60 * 1000,
        path: '/',
    },
}));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found',
    });
});

app.use(errorHandler);

export default app;
