import express from 'express';
import { createUsers } from '../controllers/userController.js';

const router = express.Router();

router.put('/', createUsers);

export default router;