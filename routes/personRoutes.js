import express from 'express'
import  getPeople  from '../controllers/personController.js'

const router = express.Router();

router.get('/', getPeople);

export default router;