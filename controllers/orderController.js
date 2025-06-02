import {
  getAllOrders,
  getOrdersByDates,
  getOrderById,
  deleteOrderById,
  updateOrderById,
  getOrdersByIdManagingPerson,
  postOrder,
  getOrdersByFacultyAndState,
} from '../services/orderService.js';
import { formatOrder } from '../formatters/orderFormatter.js';

// Get all orders
export const GetAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    const formatted = orders.map(formatOrder);
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetOrdersByDates = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const orders = await getOrdersByDates(startDate, endDate);
    const formatted = orders.map(formatOrder);
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await getOrderById(id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json(formatOrder(order));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteOrderById(id);
    res.status(200).json({ 
      message: 'Pedido eliminado correctamente', 
      deletedId: Number(id) 
    });
  } catch (error) {
    if (error.message === 'ORDER_NOT_FOUND') {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    if (error.message === 'ORDER_HAS_BILL') {
      return res.status(400).json({ error: 'No se puede eliminar un pedido que tiene factura asociada' });
    }
    if (error.message === 'INVALID_ID_FORMAT') {
      return res.status(400).json({ error: 'Formato de ID inválido' });
    }
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};

export const UpdateOrder = async (req, res) => {
  const { id } = req.params;
  const { managingPersonId, debtAmount, state, bills, observaciones } = req.body; // Agregado observaciones

  try {
    const updated = await updateOrderById(id, { 
      managingPersonId, 
      debtAmount, 
      state, 
      bills,
      observaciones // Agregado observaciones
    });
    res.status(200).json(formatOrder(updated));
  } catch (error) {
    if (error.message === 'ORDER_NOT_FOUND') {
      return res.status(404).json({ error: 'Orden no encontrada' });
    }
    if (error.message === 'NO_BILL_FOR_PAID_STATE') {
      return res.status(400).json({ error: 'No se puede cambiar a Pagado sin una factura asociada' });
    }
    if (error.message === 'ORDER_ALREADY_HAS_BILL') {
      return res.status(400).json({ error: 'Esta orden ya tiene una factura asociada' });
    }
    if (error.message.includes('BILL_ALREADY_ASSOCIATED')) {
      return res.status(400).json({ error: 'Esta factura ya está asociada a otro crédito' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const GetOrdersByApplicant = async (req, res) => {
  try {
    const { id } = req.query;
    
    if (!id) {
      return res.status(400).json({ 
        error: 'El ID del solicitante es requerido' 
      });
    }

    const orders = await getOrdersByApplicant(id);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error al obtener órdenes por solicitante:', error);
    res.status(500).json({ 
      error: 'Error al obtener las órdenes por solicitante' 
    });
  }
};

export const GetOrdersByIdManagingPerson = async (req, res) => {
  const { id } = req.query;
  try {
    const orders = await getOrdersByIdManagingPerson(id);
    const formatted = orders.map(formatOrder);
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const CheckOrderHasBill = async (req, res) => {
  const { id } = req.params;
  
  try {
    // El controlador delega la verificación al servicio
    const result = await checkOrderHasBill(id);
    res.status(200).json(result);
  } catch (error) {
    if (error.message === 'ORDER_NOT_FOUND') {
      return res.status(404).json({ error: 'Crédito no encontrado' });
    }
    res.status(500).json({ error: 'Error al verificar facturas' });
  }
};

export const PostOrder = async (req, res) => {
  const { applicantId, managingPersonId, facultyId, debtAmount, observaciones } = req.body; // Agregado observaciones
  try {
    const userId = req.userId;
    const order = await postOrder({ 
      userId, 
      applicantId, 
      managingPersonId, 
      facultyId, 
      debtAmount,
      observaciones // Agregado observaciones
    });
    res.status(201).json(formatOrder(order));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetOrdersByFacultyAndState = async (req, res) => {
  const { faculty, state } = req.query;
  try {
    const orders = await getOrdersByFacultyAndState(faculty, state);
    const formatted = orders.map(formatOrder);
    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
