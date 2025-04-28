import express from 'express';
import { GetAllCreditNotes, CreateNoteCredit } from '../controllers/creditNoteController.js';

const router = express.Router();

router.get('/', GetAllCreditNotes);
router.post('/', CreateNoteCredit);


export default router;