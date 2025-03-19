const express = require('express')
const { getPeople } = require('../controllers/personController.js')

const router = express.Router();

router.get('/', getPeople);

module.exports = router;