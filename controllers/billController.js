import { createBillForOrder, updateBillStateById } from '../services/billService.js';
import { findAssociatedNotes } from '../services/billService.js';
import { getOrderById } from '../services/orderService.js'; // implementar

export const dispatchOrder = async (req, res) => {
  const { orderId, idbill } = req.body;

  if (!orderId || !idbill) {
    return res.status(400).json({ 
      error: 'orderId e idbill son obligatorios.' 
    });
  }

  try {
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ 
        error: 'Pedido no encontrado.' 
      });
    }

    const bill = await createBillForOrder(orderId, idbill);
    res.status(201).json({ 
      message: 'Factura creada con éxito.', 
      bill 
    });
  } catch (error) {
    if (error.message === 'La orden ya tiene una factura asociada') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ 
      error: 'Error al despachar pedido.', 
      details: error.message 
    });
  }
};

export const updateBillState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  if (!state || !['activo', 'nota', 'anulado'].includes(state)) {
    return res.status(400).json({ error: 'El estado debe ser "activo", "nota", "anulado' });
  }

  try {
    const updated = await updateBillStateById(Number(id), state);
    res.status(200).json({ message: 'Estado actualizado correctamente.', bill: updated });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado.', details: error.message });
  }
};


export const getAssociatedNotes = async (req, res) => {
  try {
    const { consecutivos } = req.body;

    if (!Array.isArray(consecutivos) || consecutivos.length === 0) {
      return res.status(400).json({ error: 'Se debe enviar un listado de consecutivos.' });
    }

    const results = await findAssociatedNotes(consecutivos);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Error al buscar notas asociadas.' });
  }
};

