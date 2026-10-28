import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();
router.get('/dashboard', requireAdmin, (req, res) => {
    res.json({
        success: true,
        message: 'Admin dashboard accessed successfully'
    });
});
export default router;