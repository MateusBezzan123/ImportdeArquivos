const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lotesExternos = {
  '17': 3,
  '18': 6,
  '19': 7,
};

const mapearLoteInterno = (loteExterno) => {
  return lotesExternos[loteExterno] || null;
};

const inserirBoletos = async (boletos) => {
    const boletosInseridos = await prisma.boletos.createMany({
      data: boletos.map((boleto) => ({
        nome_sacado: boleto.nome_sacado,
        id_lote: boleto.id_lote,
        valor: boleto.valor,
        linha_digitavel: boleto.linha_digitavel,
        ativo: true,
        criado_em: new Date(),
      })),
      skipDuplicates: true,
    });
  
    return boletosInseridos;
  };
  

const obterBoletos = async (filtros) => {
  const { nome, valor_inicial, valor_final, id_lote } = filtros;

  const boletos = await prisma.boleto.findMany({
    where: {
      nome_sacado: {
        contains: nome || undefined,
      },
      valor: {
        gte: valor_inicial || undefined,
        lte: valor_final || undefined,
      },
      id_lote: {
        equals: id_lote || undefined,
      },
    },
  });

  return boletos;
};

module.exports = {
  mapearLoteInterno,
  inserirBoletos,
  obterBoletos,
};
