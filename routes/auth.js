import express from 'express';
import { signup, login, logout, protectedRoute } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/protected', authenticate, protectedRoute);

export default router;
