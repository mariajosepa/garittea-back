import express from 'express';
import { getAllCredits } from '../controllers/creditController.js';

const router = express.Router();

router.get('/',getAllCredits);

export default router;