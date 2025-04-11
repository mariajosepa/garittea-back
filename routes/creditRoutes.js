import express from 'express';
import { GetAllCredits, GetCreditsByDates, GetCreditById, PostCredit, GetCreditsByIdManagingPerson } from '../controllers/creditController.js';

const router = express.Router();

router.get('/',GetAllCredits);

router.get('/dates', GetCreditsByDates);

router.get('/:id',GetCreditById);

router.post('/', PostCredit);

router.get('/managingPerson', GetCreditsByIdManagingPerson);

export default router;