import express from 'express';
import { GetPeople, GetPersonIdByName, UpdatePerson, DeletePerson, CreatePerson } from '../controllers/personController.js';

const router = express.Router();

router.get('/', GetPeople);
router.get('/id', GetPersonIdByName); 
router.put('/:id', UpdatePerson);
router.delete('/:id', DeletePerson);
router.post('/', CreatePerson);

export default router;