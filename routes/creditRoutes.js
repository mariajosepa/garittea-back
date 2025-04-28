import express from 'express';
import { GetAllCredits, GetCreditsByDates, GetCreditById, PostCredit, GetCreditsByIdManagingPerson, DeleteCredit, GetCreditsByFacultyAndState,UpdateCredit } from '../controllers/creditController.js';

const router = express.Router();

router.get('/', GetAllCredits);
router.get('/dates', GetCreditsByDates);
router.get('/faculty', GetCreditsByFacultyAndState);
router.get('/managingPerson', GetCreditsByIdManagingPerson);
router.get('/:id', GetCreditById);
router.delete('/:id', DeleteCredit);
router.patch('/:id', UpdateCredit);
router.post('/', PostCredit);


export default router;