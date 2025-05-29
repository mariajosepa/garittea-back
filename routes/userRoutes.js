import express from 'express';
import { 
    createUserHandler, 
    getAllUsersHandler, 
    getUserByIdHandler,
    searchUsersHandler
} from '../controllers/userController.js';

const router = express.Router();

// Rutas base sin '/users' ya que express.Router() lo manejará
router.get('/', getAllUsersHandler);
router.post('/', createUserHandler);
router.get('/search', searchUsersHandler);
router.get('/:id', getUserByIdHandler);

export default router;