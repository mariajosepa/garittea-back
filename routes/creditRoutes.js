import express from 'express';
import { GetAllCredits, GetCreditsByDates, GetCreditById, PostCredit } from '../controllers/creditController.js';

const router = express.Router();

router.get('/',GetAllCredits);

router.get('/dates', GetCreditsByDates);

router.get('/:id',GetCreditById);

router.post('/', PostCredit);

export default router;