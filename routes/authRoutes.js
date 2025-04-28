import express from 'express';
import { login, logout,  me } from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/jwtAuth.js';

const router = express.Router();
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authenticateJWT, me);

export default router;