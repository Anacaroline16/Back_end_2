// rotas da API

import express from "express";
import { retornaMedicos, retornaMedicosEspecialidade, retornaMedicosNome } from "./servico/retornaMedicos_servico.js";


const app = express();

app.get('/clinica', async (req, res) => {
    let clinica;

    const nome = req.query.nome;
    const especialidade = req.query.especialidade;
    //rever o tratamento de dados
    try{
        if (typeof nome === 'undefined' && typeof especialidade === 'undefined' ){
        clinica = await retornaMedicos();
        }
        else if (typeof nome !== 'undefined'){
        clinica = await retornaMedicosNome(nome);
        }
        else if (typeof especialidade !== 'undefined'){
        clinica = await retornaMedicosEspecialidade(especialidade);
        }
        if ( clinica.length > 0){
            res.json(clinica);
        }
        else{
            res.status(404).json({mensagem : 'Nenhum médico encontrado'})
        }
        // const clinica = await retornaMedicos(); //retorna todos os dados
    } catch(error){
        console.log('Erro ao buscar médicos:', error);
        res.status(500).json({mensagem: ' Erro interno no servidor'})
    }
    
    
    
})


app.listen(9000, async () => {
    const data = new Date();
    console.log('Servidor node iniciado em:' + data);

    // const conexao = await pool.getConnection();
    // console.log(conexao.threadId);

    // conexao.release();
});