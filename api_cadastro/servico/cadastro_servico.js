import pool from "./conexao.js";

export async function cadastraDados() {
    const conexao = await pool.getConnection();
    const query = ('INSERT INTO dadosCadastrados(nome, email, telefone )VALUES (?, ?, ?) ', [nome, email, telefone]);
    const cadastra = executaQuery(conexao, query);
    conexao.release();
    return cadastra;
}

async function executaQuery(conexao, query) {
    const resultado_query = await conexao.execute(query);
    const resposta = resultado_query.query[0];
    return resposta
}