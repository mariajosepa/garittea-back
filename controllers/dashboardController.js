import {
    ventasCreditoMesService,
    notasCreditoAnioService,
    facultadesTopService
  } from '../services/dashboardService.js';
  
  export const getVentasCreditoMes = async (req, res) => {
    try {
      const total = await ventasCreditoMesService();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener ventas del mes' });
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
  