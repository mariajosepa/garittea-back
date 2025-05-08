import express from 'express';
import {
  getVentasCreditoMes,
  getNotasCreditoAnio,
  getFacultadesTop,
  getVentasPorMes,
  getNotasPorAnio,
  getCarteraPagadaAnio,
  getCarteraPagadaUltimosAnios,
  getCarteraMorosaAnio,
  getCarteraMorosaUltimosAnios
} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/ventas-credito-mes', getVentasCreditoMes);
router.get('/ventas-por-mes', getVentasPorMes);
router.get('/notas-credito-anio', getNotasCreditoAnio);
router.get('/notas-por-anio', getNotasPorAnio);
router.get('/facultades-top', getFacultadesTop);
router.get('/cartera-pagada-anio', getCarteraPagadaAnio);
router.get('/cartera-pagada-anios', getCarteraPagadaUltimosAnios);
router.get('/cartera-morosa-anio', getCarteraMorosaAnio);
router.get('/cartera-morosa-anios', getCarteraMorosaUltimosAnios);
export default router;
