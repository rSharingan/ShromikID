import express from 'express';
import {
  login,
  loginOtp,
  registerWorker,
  registerEmployer,
  getMe,
  updateProfile,
  sendOtp,
  verifyOtp,
} from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.post('/login-otp', loginOtp);
router.post('/register/worker', registerWorker);
router.post('/register/employer', registerEmployer);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.get('/me', requireAuth, getMe);
router.put('/profile', requireAuth, updateProfile);

export default router;

