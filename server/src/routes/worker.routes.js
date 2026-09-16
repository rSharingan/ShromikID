import express from 'express';
import {
  getWorkers,
  getWorkerById,
  getWorkerStats,
  updateSkills,
} from '../controllers/worker.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getWorkers);
router.get('/stats', requireAuth, requireRole('worker'), getWorkerStats);
router.get('/:id', getWorkerById);
router.put('/skills', requireAuth, requireRole('worker'), updateSkills);

export default router;
