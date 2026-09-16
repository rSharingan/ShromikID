import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getJobCategories,
} from '../controllers/job.controller.js';
import { requireAuth, requireRole, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/categories', getJobCategories);
router.get('/:id', optionalAuth, getJobById);
router.post('/', requireAuth, requireRole('employer'), createJob);
router.put('/:id', requireAuth, updateJob);
router.delete('/:id', requireAuth, deleteJob);

export default router;
