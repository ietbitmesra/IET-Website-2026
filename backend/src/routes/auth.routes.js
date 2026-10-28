import { Router } from 'express';
import {
    login,
    logout,
    getCurrentAdmin
} from '../controllers/auth.controllers.js';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { loginLimiter } from '../middleware/loginLimiter.js';

const router = Router();


router.post('/login', loginLimiter, login);
router.post('/logout', requireAdmin, logout);
router.get('/me', requireAdmin, getCurrentAdmin);

export default router;