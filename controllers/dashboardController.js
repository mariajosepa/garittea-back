import {
    ventasCreditoMesService,
    notasCreditoAnioService,
    facultadesTopService,
    ventasPorMesService 
  } from '../services/dashboardService.js';
  
  export const getVentasCreditoMes = async (req, res) => {
    try {
      const total = await ventasCreditoMesService();
      
      res.json({ debtamount: total._sum.debtamount ?? 0 });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener ventas del mes' });
    }
  };

  export const getVentasPorMes = async (req, res) => {
    try {
      const data = await ventasPorMesService();
      res.json({ series: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener ventas por mes' });
    }
  };
  
  export const getNotasCreditoAnio = async (req, res) => {
    try {
      const total = await notasCreditoAnioService();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener notas de crédito del año' });
    }
  };
  
  export const getFacultadesTop = async (req, res) => {
    try {
      const top = await facultadesTopService();
      res.json({ facultades: top });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener facultades top' });
    }
  };
  