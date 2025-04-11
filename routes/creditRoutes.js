import express from 'express';
import { GetAllCredits, GetCreditsByDates,GetCreditById } from '../controllers/creditController.js';

const router = express.Router();

router.get('/',GetAllCredits);

router.get('/dates', GetCreditsByDates);

router.get('/:id',GetCreditById);

export default router;