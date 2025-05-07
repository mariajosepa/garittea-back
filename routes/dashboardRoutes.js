import express from 'express';
import {
  getVentasCreditoMes,
  getNotasCreditoAnio,
  getFacultadesTop,
  getVentasPorMes 
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/ventas-credito-mes', getVentasCreditoMes);
router.get('/ventas-por-mes', getVentasPorMes);
router.get('/notas-credito-anio', getNotasCreditoAnio);
router.get('/facultades-top', getFacultadesTop);

export default router;
