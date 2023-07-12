const express = require('express');
const fileUpload = require('express-fileupload');
const arquivoRoutes = require('./src/routes/arquivoRoutes');

const app = express();

// Configurar middleware para o upload de arquivos
app.use(fileUpload());
app.use("/", arquivoRoutes);

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});