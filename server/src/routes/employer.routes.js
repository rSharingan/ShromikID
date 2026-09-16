import express from 'express';
import {
  getEmployers,
  getEmployerById,
  getEmployerStats,
} from '../controllers/employer.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEmployers);
router.get('/stats', requireAuth, requireRole('employer'), getEmployerStats);
router.get('/:id', getEmployerById);

export default router;
