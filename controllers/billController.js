import { createBillForOrder, updateBillStateById } from '../services/billService.js';
import { findAssociatedNotes } from '../services/billService.js';
import { getOrderById } from '../services/orderService.js'; // implementar

export const dispatchOrder = async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ error: 'orderId es obligatorio.' });
  }

  try {
    const order = await getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado.' });
    }

    if (order.bill) {
      return res.status(400).json({ error: 'El pedido ya tiene factura asociada.' });
    }

    const bill = await createBillForOrder(orderId);
    res.status(201).json({ message: 'Factura creada con éxito.', bill });
  } catch (error) {
    res.status(500).json({ error: 'Error al despachar pedido.', details: error.message });
  }
};

export const updateBillState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  if (!state || !['activo', 'cancelado'].includes(state)) {
    return res.status(400).json({ error: 'El estado debe ser "activo" o "cancelado".' });
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

