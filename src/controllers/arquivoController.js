const fs = require('fs');
const csvParser = require('csv-parser');
const prisma = require('../../prisma/client');

async function importarBoletos(req, res) {
  if (!req.files || !req.files.file) {
    return res.status(400).send('Nenhum arquivo enviado.');
  }

  const file = req.files.file;
  
  // Verificar se o arquivo está presente
  if (!file.tempFilePath) {
    return res.status(400).send('Arquivo inválido.');
  }
  
  // Ler o arquivo CSV e importar os boletos
  fs.createReadStream(file.tempFilePath)
    .pipe(csvParser({ separator: ';' }))
    .on('data', async (row) => {
      const { nome, unidade, valor, linha_digitavel } = row;

      try {
        // Criar um novo lote se não existir com o nome correspondente
        const lote = await prisma.lote.findFirst({
          where: { nome },
        });

        let loteId;
        if (!lote) {
          const novoLote = await prisma.lote.create({
            data: {
              nome,
              ativo: true,
            },
          });
          loteId = novoLote.id;
        } else {
          loteId = lote.id;
        }

        // Criar o boleto
        await prisma.boleto.create({
          data: {
            nomeSacado: nome,
            idLote: loteId,
            valor: parseFloat(valor),
            linhaDigitavel: linha_digitavel,
            ativo: true,
          },
        });
      } catch (error) {
        console.error(`Erro ao importar boleto: ${error}`);
      }
    })
    .on('end', async () => {
      // Remover o arquivo temporário
      fs.unlinkSync(file.tempFilePath);

      res.status(200).send('Boletos importados com sucesso.');
    })
    .on('error', (err) => {
      console.error(`Erro ao ler o arquivo CSV: ${err}`);
      res.status(500).send('Ocorreu um erro ao importar os boletos.');
    });
}

module.exports = {
  importarBoletos,
};
