import express from 'express';
import {
  GetAllOrders,
  GetOrdersByDates,
  GetOrderById,
  PostOrder,
  GetOrdersByIdManagingPerson,
  DeleteOrder,
  GetOrdersByFacultyAndState,
  UpdateOrder,
  CheckOrderHasBill,
  GetOrdersByApplicant
} from '../controllers/orderController.js';

const router = express.Router();

router.get('/', GetAllOrders);
router.get('/dates', GetOrdersByDates);
router.get('/faculty', GetOrdersByFacultyAndState);
router.get('/applicant', GetOrdersByApplicant);
router.get('/managingPerson', GetOrdersByIdManagingPerson);
router.get('/:id/check-bill', CheckOrderHasBill);
router.get('/:id', GetOrderById);
router.delete('/:id', DeleteOrder);
router.patch('/:id', UpdateOrder);
router.post('/', PostOrder);

export default router;
