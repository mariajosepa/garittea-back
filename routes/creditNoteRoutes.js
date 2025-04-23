import express from 'express';
import { GetAllCreditNotes } from '../controllers/creditNoteController.js';

const router = express.Router();

router.get('/', GetAllCreditNotes);

export default router;