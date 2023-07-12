const csv = require("csv-parser");
const fs = require("fs");

function importarBoletos(file) {
  return new Promise((resolve, reject) => {
    const boletos = [];

    fs.createReadStream(file.tempFilePath)
      .pipe(csv({ delimiter: ";" }))
      .on("data", (data) => {
        // Extrair os dados do CSV
        const { nome, unidade, valor, linha_digitavel } = data;

        // Adicionar boleto à lista
        boletos.push({
          nome_sacado: nome,
          id_lote: parseInt(unidade),
          valor: parseFloat(valor),
          linha_digitavel,
          ativo: true,
          criado_em: new Date(),
        });
      })
      .on("end", () => {
        resolve(boletos);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = {
  importarBoletos,
};
