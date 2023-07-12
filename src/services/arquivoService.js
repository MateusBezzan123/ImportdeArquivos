const fs = require('fs');
const csv = require('fast-csv');

const importarBoletos = async (file) => {
  return new Promise((resolve, reject) => {
    const boletos = [];

    const stream = fs.createReadStream(file.path);
    const csvStream = csv.parse({ headers: true });

    stream
      .pipe(csvStream)
      .on('error', (error) => reject(error))
      .on('data', (data) => {
        const boleto = {
          nome_sacado: data.nome_sacado,
          lote_externo: data.lote_externo,
          valor: parseFloat(data.valor),
          linha_digitavel: data.linha_digitavel,
        };

        boletos.push(boleto);
      })
      .on('end', () => {
        if (boletos.length === 0) {
          reject(new Error('Nenhum boleto encontrado no arquivo'));
        } else {
          resolve(boletos);
        }
      });
  });
};


module.exports = {
  importarBoletos,
};
