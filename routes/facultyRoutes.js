import express from 'express';
import { GetAllFaculties, GetFacultyById, GetFacultyIdByName, CreateFaculty, UpdateFaculty, DeleteFaculty } from '../controllers/facultyController.js';

const router = express.Router();

router.get('/', GetAllFaculties)
router.get('/:id', GetFacultyById);
router.get('/id', GetFacultyIdByName); 
router.post('/', CreateFaculty);
router.put('/:id', UpdateFaculty);
router.delete('/:id', DeleteFaculty);

export default router;