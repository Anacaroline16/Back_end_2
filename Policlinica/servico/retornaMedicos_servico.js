// funcoes para consultar o banco
import pool from "./conexao.js";

export async function retornaMedicos() {
    const conexao = await pool.getConnection();
    const query = 'SELECT medicos.id, medicos.nome, medicos.telefone, medicos.email, especialidades.especialidade FROM medicos INNER JOIN especialidades ON especialidades.id = medicos.especialidade order by medicos.nome';
    const clinica = executaQuery(conexao,query);
    conexao.release();
    return clinica;
}

export async function retornaMedicosNome(nome) {
    const conexao = await pool.getConnection();
    const query = `SELECT medicos.nome, medicos.telefone, medicos.email, especialidades.especialidade FROM medicos INNER JOIN especialidades ON especialidades.id = medicos.especialidade WHERE nome LIKE '%${nome}%'`;
    const clinica = executaQuery(conexao,query);
    conexao.release();
    return clinica;
}

export async function retornaMedicosEspecialidade(especialidade) {
    const conexao = await pool.getConnection();
    const query = `SELECT medicos.nome,medicos.telefone, medicos.email FROM medicos INNER JOIN especialidades ON especialidades.id = medicos.especialidade WHERE especialidade LIKE '%${especialidade}%'`;
    const clinica = executaQuery(conexao,query);
    conexao.release()
    return clinica;
}

async function executaQuery(conexao,query){
    const resultado_query = await conexao.execute(query);
    const resposta = resultado_query[0];
    return resposta;
}