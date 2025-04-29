import express from 'express';
import { massiveCreateBill } from '../controllers/billController.js';

const router = express.Router();

// Ruta para crear una factura asociada a un crédito
router.post('/massive', massiveCreateBill);

export default router;
