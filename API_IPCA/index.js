import  express  from "express";
import {buscar_td_Dados_ipca, buscar_ipcaPorAno} from  './servicos/servico.js'

const app = express();

app.get('/historicoIPCA', (req, res) => {
    const ano = req.query.ano;
    const resultado = ano ? buscar_ipcaPorAno(ano): buscar_td_Dados_ipca();
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({"erro": "Nenhum ano encontrado"});
    }
});
app.get('/historicoIPCA/:id', (req,res) => {
    const uf = buscarUfPorId(req.params.iduf);

    if(uf){
        res.json(uf);
    } else if (isNaN(parseInt(req.params.iduf))){
        res.status(400).send({'erro' : 'Requisição inválida'});
    } else {
        res.status(404).send({'erro': 'UF não encontrada'});
    }
});
app.listen(8080,() => {
    console.log('Servidor iniciado na porta 8080');
});
