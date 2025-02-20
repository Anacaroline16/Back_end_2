import pool from "./conexao.js";

export async function cadastraDados(nome, email, telefone) {
    const conexao = await pool.getConnection();
    const query = 'INSERT INTO dadosCadastrados (nome, email, telefone) VALUES (?,?,?) ';
    const [cadastra] = await conexao.execute(query, [nome, email, telefone]);
    conexao.release();
    return cadastra;
}


// banco de dados

// create database cadastroDados;

// use cadastroDados;

// create table dadosCadastrados(
// 	id int not null auto_increment primary key,
//     nome varchar(35),
//     email varchar(35),
//     telefone varchar(35)
// );