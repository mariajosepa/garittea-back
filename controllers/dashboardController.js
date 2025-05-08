import {
    ventasCreditoMesService,
    notasCreditoAnioService,
    facultadesTopService,
    ventasPorMesService,
    notasPorAnioService,
    carteraPagadaAnioService,
    carteraPagadaUltimosAniosService,
    carteraMorosaAnioService,
    carteraMorosaUltimosAniosService
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

  export const getNotasPorAnio = async (req, res) => {
    try {
      const data = await notasPorAnioService();
      res.json({ series: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener notas por año' });
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

  export const getCarteraPagadaAnio = async (req, res) => {
    try {
      const total = await carteraPagadaAnioService();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener cartera pagada del año' });
    }
  };

  export const getCarteraPagadaUltimosAnios = async (req, res) => {
    try {
      const data = await carteraPagadaUltimosAniosService();
      res.json({ series: data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener cartera pagada de años anteriores' });
    }
  };

  export const getCarteraMorosaAnio = async (req, res) => {
    try {
      const total = await carteraMorosaAnioService();
      res.json({ total });
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener la cartera morosa del año' });
    }
  };

  export const getCarteraMorosaUltimosAnios = async (req, res) => {
    try {
      const data = await carteraMorosaUltimosAniosService();
      res.json({ data });
    } catch (err) {
      console.error('Error al obtener cartera morosa por años:', err);
      res.status(500).json({ error: 'Error al obtener cartera morosa por años' });
    }
  };