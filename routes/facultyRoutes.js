import express from 'express';
import { GetAllFaculties } from '../controllers/facultyController.js';
import { GetFacultyIdByName } from '../controllers/facultyController.js';

const router = express.Router();

router.get('/', GetAllFaculties)
router.get('/id', GetFacultyIdByName); 

export default router;