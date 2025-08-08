import express from 'express';
import {
  signup,
  login,
  resetPassword,
  updateEmail
} from '../controllers/authController.js'; // ✅ CORRECT

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password', resetPassword);
router.post('/update-email', updateEmail);

export default router;
