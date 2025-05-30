import express from 'express';
import { 
    createUserHandler, 
    getAllUsersHandler, 
    getUserByIdHandler,
    searchUsersHandler,
    updateUserHandler,
    deleteUserHandler
} from '../controllers/userController.js';

const router = express.Router();

// Rutas base sin '/users' ya que express.Router() lo manejará
router.get('/', getAllUsersHandler);
router.post('/', createUserHandler);
router.get('/search', searchUsersHandler);
router.get('/:id', getUserByIdHandler);
router.put('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

export default router;