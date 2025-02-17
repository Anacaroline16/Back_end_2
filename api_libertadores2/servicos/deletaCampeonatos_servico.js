import pool from './conexao.js';

export async function deletaCampeonato(id) {
    const conexao = await pool.getConnection(); //cria a conexão e atribui a variavel conexão
    const query = 'DELETE FROM campeonatos WHERE id = ?';
    const [resposta] = await conexao.execute(query, [id]); //executa no banco de dados os que queremos que seja feito e guarda na variavel resposta
    console.log(resposta);
    conexao.release();
    return resposta;
}

