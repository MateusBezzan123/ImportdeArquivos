const boletoService = require('../services/boletoService');

const obterBoletos = async (req, res) => {
  try {
    const filtros = req.query;
    const boletos = await boletoService.obterBoletos(filtros);

    res.json(boletos);
  } catch (error) {
    console.error('Erro ao obter boletos:', error);
    res.status(500).json({ message: 'Erro ao obter boletos', error: error.message });
  }
};

module.exports = {
  obterBoletos,
};
