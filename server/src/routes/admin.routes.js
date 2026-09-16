import express from 'express';
import {
  getAdminStats,
  getVerificationQueue,
  updateVerificationStatus,
} from '../controllers/admin.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require admin role
router.use(requireAuth, requireRole('admin'));

router.get('/stats', getAdminStats);
router.get('/verification-queue', getVerificationQueue);
router.patch('/verify/:userId', updateVerificationStatus);

export default router;
