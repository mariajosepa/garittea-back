import express from 'express';
import { dispatchOrder, updateBillState, getAssociatedNotes } from '../controllers/billController.js';

const router = express.Router();

router.post('/dispatch', dispatchOrder); // Crear bill
router.patch('/:id/update-status', updateBillState); // Actualizar estado de bill
router.post('/associated-notes', getAssociatedNotes);


export default router;
