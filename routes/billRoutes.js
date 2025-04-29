import express from 'express';
import { dispatchOrder, updateBillState } from '../controllers/billController.js';

const router = express.Router();

router.post('/dispatch', dispatchOrder); // Crear bill
router.patch('/:id/update-status', updateBillState); // Actualizar estado de bill

export default router;
