import express from 'express';
import { GetAllCredits, GetCreditsByDates, GetCreditById, PostCredit, GetCreditsByIdManagingPerson, DeleteCredit, GetCreditsByFacultyAndState } from '../controllers/creditController.js';

const router = express.Router();

router.get('/', GetAllCredits);
router.get('/dates', GetCreditsByDates);
router.get('/faculty', GetCreditsByFacultyAndState);
router.get('/managingPerson', GetCreditsByIdManagingPerson);
router.get('/:id', GetCreditById);
router.delete('/:id', DeleteCredit);
router.post('/', PostCredit);


export default router;