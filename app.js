const express = require('express');
const app = express();

app.use(express.json());

// Rotas
const arquivoRoutes = require('./src/routes/arquivoRoutes');
const boletoRoutes = require('./src/routes/boletoRoutes');

app.use('/arquivos', arquivoRoutes);
app.use('/boletos', boletoRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});


module.exports = app;
