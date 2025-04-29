import express from 'express'
import  GetPeople  from '../controllers/personController.js'
import { GetPersonIdByName } from '../controllers/personController.js';

const router = express.Router();

router.get('/', GetPeople);

router.get('/id', GetPersonIdByName); 

export default router;