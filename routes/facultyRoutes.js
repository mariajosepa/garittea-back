import express from 'express';
import { GetAllFaculties } from '../controllers/facultyController.js';

const router = express.Router();

router.get('/', GetAllFaculties)

export default router;