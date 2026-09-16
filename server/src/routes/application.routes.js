import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
} from '../controllers/application.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, requireRole('worker'), applyForJob);
router.get('/my-applications', requireAuth, requireRole('worker'), getMyApplications);
router.get('/job/:jobId', requireAuth, requireRole('employer', 'admin'), getJobApplications);
router.patch('/:id/status', requireAuth, requireRole('employer', 'admin'), updateApplicationStatus);

export default router;
