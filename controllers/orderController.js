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
    await deleteOrderById(id);
    res.status(200).json({ message: 'Pedido eliminado correctamente', deletedId: Number(id) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateOrder = async (req, res) => {
  const { id } = req.params;
  const { managingPersonId, debtAmount, state } = req.body;

  try {
    const updated = await updateOrderById(id, { managingPersonId, debtAmount, state });
    res.status(200).json(formatOrder(updated));
  } catch (error) {
    res.status(500).json({ error: error.message });
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

export const PostOrder = async (req, res) => {
  const { userId, applicantId, managingPersonId, facultyId, debtAmount } = req.body;
  try {
    const order = await postOrder({ userId, applicantId, managingPersonId, facultyId, debtAmount });
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
