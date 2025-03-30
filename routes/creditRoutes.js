import express from 'express';
import { GetAllCredits } from '../controllers/creditController.js';

const router = express.Router();

router.get('/',GetAllCredits);

export default router;