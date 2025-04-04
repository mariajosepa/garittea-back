import express from 'express';
import { GetAllCredits, GetCreditById } from '../controllers/creditController.js';

const router = express.Router();

router.get('/',GetAllCredits);

router.get('/:id',GetCreditById);

export default router;