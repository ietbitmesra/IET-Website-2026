import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Login Rate Limiter', () => {
    it('blocks excessive login attempts after exceeding the rate limit with 429', async () => {
        for (let i = 0; i < 20; i++) {
            await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'btech10555.25@bitmesra.ac.in',
                    password: 'TestPassword123!',
                });
        }
        const blockedRes = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'btech10555.25@bitmesra.ac.in',
                password: 'TestPassword123!',
            });

        expect(blockedRes.status).toBe(429);
        expect(blockedRes.body.success).toBe(false);
        expect(blockedRes.body.message).toContain('Too many login attempts');
    }, 15000);
});
