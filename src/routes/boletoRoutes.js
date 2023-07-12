const express = require('express');
const router = express.Router();

const boletoController = require('../controllers/boletoController');

router.get('/', boletoController.obterBoletos);

module.exports = router;
