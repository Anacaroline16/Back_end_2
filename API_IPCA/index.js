import express from "express";
import {buscar_td_Dados_ipca,buscar_ipcaPorAno,buscar_ipca_porId,valor_reajustado} from "./servicos/servico.js";
import historicoInflacao from "./dados/dados.js";

const app = express();

app.get("/historicoIPCA", (req, res) => {
  const ano = req.query.ano;
  const resultado = ano
    ? buscar_ipcaPorAno(ano, historicoInflacao)
    : buscar_td_Dados_ipca(historicoInflacao);
  if (resultado.length > 0) {
    res.json(resultado);
  } else {
    res.status(404).send({
      erro: "Nenhum histórico encontrado para o ano especificado.",
    });
  }
});

app.get("/historicoIPCA/calculo", (req, res) => {
  const valorInicial = parseFloat(req.query.valor);
  const mesInicial = parseInt(req.query.mesInicial);
  const anoInicial = parseInt(req.query.anoInicial);
  const mesFinal = parseInt(req.query.mesFinal);
  const anoFinal = parseInt(req.query.anoFinal);

  if (
    isNaN(valorInicial) ||
    isNaN(mesInicial) ||
    isNaN(anoInicial) ||
    isNaN(mesFinal) ||
    isNaN(anoFinal) ||
    mesInicial < 1 ||
    mesInicial > 12 ||
    mesFinal < 1 ||
    mesFinal > 12 ||
    anoInicial > anoFinal ||
    anoInicial < 2015 ||
    anoFinal > 2024
  ) {
    return res.status(400).json({
      error: "Parâmetros inválidos.",
    });
  }

  try {
    const resultado = valor_reajustado(
      valorInicial,
      mesInicial,
      anoInicial,
      mesFinal,
      anoFinal,
      historicoInflacao
    );

    res.json({
      valorReajustado: resultado
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/historicoIPCA/:id", (req, res) => {
  const id = buscar_ipca_porId(req.params.id, historicoInflacao);
  if (id) {
    res.json(id);
  } else if (isNaN(parseInt(req.params.id))) {
    res.status(400).send({ erro: "Requisição inválida" });
  } else {
    res.status(404).send({ erro: "Elemento não encontrado." });
  }
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080");
});
