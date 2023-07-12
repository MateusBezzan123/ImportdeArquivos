const express = require('express');
const router = express.Router();
const multer = require('multer');

const arquivoController = require('../controllers/arquivoController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('file'), arquivoController.importarArquivo);

module.exports = router;
