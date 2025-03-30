import express from 'express'
import  GetPeople  from '../controllers/personController.js'

const router = express.Router();

router.get('/', GetPeople);

export default router;