const arquivoService = require('../services/arquivoService');
const boletoService = require('../services/boletoService');

const importarArquivo = async (req, res) => {
  try {
    const file = req.file;
    const boletos = await arquivoService.importarBoletos(file);

    if (!boletos || boletos.length === 0) {
      return res.status(400).json({ message: 'Nenhum boleto encontrado no arquivo' });
    }

    const boletosMapeados = boletoService.mapearLoteInterno(boletos);
    await boletoService.inserirBoletos(boletosMapeados);

    res.status(201).json({ message: 'Boletos importados com sucesso' });
  } catch (error) {
    console.error('Erro ao importar boletos:', error);
    res.status(500).json({ message: 'Erro ao importar boletos', error: error.message });
  }
};


module.exports = {
  importarArquivo,
};
