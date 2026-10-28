import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../src/app.js';
import * as adminRepo from '../src/repositories/admin.repository.js';

describe('IET Authentication & Security API', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Health & Routing', () => {
        it('returns 200 for the health endpoint', async () => {
            const response = await request(app).get('/api/health');
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('IET Coding Club API is running');
        });

        it('returns 404 JSON for unknown endpoints', async () => {
            const response = await request(app).get('/api/nonexistent-endpoint');
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Resource not found');
        });
    });

    describe('Input Validation', () => {
        it.each([
            'btech10555.23@bitmesra.ac.in',
            'btech10555.26@bitmesra.ac.in',
            'student@gmail.com',
            'invalid-email',
            '',
            '   ',
        ])('rejects disallowed or malformed email: %s', async (email) => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email,
                    password: 'TestPassword123!',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it.each([
            'btech10555.24@bitmesra.ac.in',
            'btech10555.25@bitmesra.ac.in',
        ])('accepts allowed batch email during format validation: %s', async (email) => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email,
                    password: 'TestPassword123!',
                });
            expect(response.status).not.toBe(400);
        });

        it('rejects missing password', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: 'btech10555.25@bitmesra.ac.in' });
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Password is required.');
        });

        it('rejects non-object body', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send([1, 2, 3]);
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('A JSON request body is required.');
        });

        it('rejects excessively long email (> 254 chars)', async () => {
            const longEmail = 'a'.repeat(240) + '.25@bitmesra.ac.in';
            const response = await request(app)
                .post('/api/auth/login')
                .send({ email: longEmail, password: 'ValidPassword123!' });
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('rejects excessively long password (> 1024 chars)', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech10555.25@bitmesra.ac.in',
                    password: 'a'.repeat(1025),
                });
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Password is too long.');
        });

        it('handles malformed JSON payload safely with 400', async () => {
            const response = await request(app)
                .post('/api/auth/login')
                .set('Content-Type', 'application/json')
                .send('{"email": "btech10555.25@bitmesra.ac.in", password');
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid JSON payload.');
        });
    });

    describe('CORS Security', () => {
        it('allows configured trusted origin with credentials', async () => {
            const response = await request(app)
                .get('/api/health')
                .set('Origin', 'http://localhost:5173');
            expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
            expect(response.headers['access-control-allow-credentials']).toBe('true');
        });

        it('does not set CORS allow-origin header for unapproved origins', async () => {
            const response = await request(app)
                .get('/api/health')
                .set('Origin', 'https://malicious-website.com');
            expect(response.headers['access-control-allow-origin']).toBeUndefined();
        });
    });

    describe('Authentication & Authorization Flow', () => {
        it('rejects unauthenticated access to /me', async () => {
            const response = await request(app).get('/api/auth/me');
            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Authentication required.');
        });

        it('rejects unauthenticated access to protected /api/admin/dashboard', async () => {
            const response = await request(app).get('/api/admin/dashboard');
            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Authentication required.');
        });

        it('rejects login when admin is not found in database', async () => {
            vi.spyOn(adminRepo, 'findAdminByEmail').mockResolvedValue(null);

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech99999.25@bitmesra.ac.in',
                    password: 'NonExistentPassword123!',
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid email or password');
        });

        it('rejects login when admin account is inactive', async () => {
            const testPasswordHash = await bcrypt.hash('ActiveSecret123!', 10);
            vi.spyOn(adminRepo, 'findAdminByEmail').mockResolvedValue({
                id: '50',
                name: 'Deactivated User',
                college_email: 'btech10555.25@bitmesra.ac.in',
                password_hash: testPasswordHash,
                role: 'admin',
                is_active: false,
            });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech10555.25@bitmesra.ac.in',
                    password: 'ActiveSecret123!',
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid email or password');
        });

        it('rejects login when password does not match', async () => {
            const testPasswordHash = await bcrypt.hash('ActualSecret123!', 10);
            vi.spyOn(adminRepo, 'findAdminByEmail').mockResolvedValue({
                id: '51',
                name: 'Valid Admin',
                college_email: 'btech10555.25@bitmesra.ac.in',
                password_hash: testPasswordHash,
                role: 'admin',
                is_active: true,
            });

            const response = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech10555.25@bitmesra.ac.in',
                    password: 'WrongPassword123!',
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Invalid email or password');
        });

        it('authenticates valid credentials, sets session cookie, and never leaks password_hash', async () => {
            const rawPassword = 'CorrectSecret123!';
            const passwordHash = await bcrypt.hash(rawPassword, 10);
            const mockAdmin = {
                id: '77',
                name: 'Audit Test Admin',
                college_email: 'btech10555.25@bitmesra.ac.in',
                password_hash: passwordHash,
                role: 'admin',
                is_active: true,
            };

            vi.spyOn(adminRepo, 'findAdminByEmail').mockResolvedValue(mockAdmin);
            vi.spyOn(adminRepo, 'findActiveAdminById').mockResolvedValue(mockAdmin);

            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech10555.25@bitmesra.ac.in',
                    password: rawPassword,
                });

            expect(loginRes.status).toBe(200);
            expect(loginRes.body.success).toBe(true);
            expect(loginRes.body.admin).toBeDefined();
            expect(loginRes.body.admin.name).toBe('Audit Test Admin');
            expect(loginRes.body.admin.email).toBe('btech10555.25@bitmesra.ac.in');
            expect(loginRes.body.admin.password_hash).toBeUndefined();

            const cookie = loginRes.headers['set-cookie'];
            expect(cookie).toBeDefined();

            const meRes = await request(app)
                .get('/api/auth/me')
                .set('Cookie', cookie);
            expect(meRes.status).toBe(200);
            expect(meRes.body.success).toBe(true);
            expect(meRes.body.admin.name).toBe('Audit Test Admin');
            expect(meRes.body.admin.password_hash).toBeUndefined();
            const dashRes = await request(app)
                .get('/api/admin/dashboard')
                .set('Cookie', cookie);
            expect(dashRes.status).toBe(200);
            expect(dashRes.body.success).toBe(true);

            const logoutRes = await request(app)
                .post('/api/auth/logout')
                .set('Cookie', cookie);
            expect(logoutRes.status).toBe(200);
            expect(logoutRes.body.success).toBe(true);
            expect(logoutRes.headers['set-cookie']).toBeDefined();

            const postLogoutRes = await request(app)
                .get('/api/auth/me')
                .set('Cookie', cookie);
            expect(postLogoutRes.status).toBe(401);
        });

        it('rejects access if admin was deactivated after session was issued', async () => {
            const rawPassword = 'CorrectSecret123!';
            const passwordHash = await bcrypt.hash(rawPassword, 10);
            const mockAdmin = {
                id: '88',
                name: 'Revoked Admin',
                college_email: 'btech10555.24@bitmesra.ac.in',
                password_hash: passwordHash,
                role: 'admin',
                is_active: true,
            };

            vi.spyOn(adminRepo, 'findAdminByEmail').mockResolvedValue(mockAdmin);
            vi.spyOn(adminRepo, 'findActiveAdminById').mockResolvedValue(mockAdmin);

            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech10555.24@bitmesra.ac.in',
                    password: rawPassword,
                });

            const cookie = loginRes.headers['set-cookie'];

            vi.spyOn(adminRepo, 'findActiveAdminById').mockResolvedValue(null);

            const res = await request(app)
                .get('/api/auth/me')
                .set('Cookie', cookie);

            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Authentication required.');
        });

        it('enforces role-based authorization (403 when role is not admin)', async () => {
            const rawPassword = 'CorrectSecret123!';
            const passwordHash = await bcrypt.hash(rawPassword, 10);
            const mockNonAdmin = {
                id: '99',
                name: 'Standard Member',
                college_email: 'btech10555.25@bitmesra.ac.in',
                password_hash: passwordHash,
                role: 'member',
                is_active: true,
            };

            vi.spyOn(adminRepo, 'findAdminByEmail').mockResolvedValue(mockNonAdmin);
            vi.spyOn(adminRepo, 'findActiveAdminById').mockResolvedValue(mockNonAdmin);

            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech10555.25@bitmesra.ac.in',
                    password: rawPassword,
                });

            const cookie = loginRes.headers['set-cookie'];

            const res = await request(app)
                .get('/api/admin/dashboard')
                .set('Cookie', cookie);

            expect(res.status).toBe(403);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toContain('Admin role required');
        });
    });
});