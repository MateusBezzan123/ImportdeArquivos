// routes/boletoRoutes.js
const express = require("express");
const router = express.Router();
const arquivoControllerController = require("../controllers/arquivoController");

router.post("/importar", arquivoControllerController.importarBoletos);

module.exports = router;