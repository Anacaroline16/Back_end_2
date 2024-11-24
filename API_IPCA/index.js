import  express  from "express";
import {buscar_td_Dados_ipca, buscar_ipcaPorAno, buscar_ipca_porId, valor_reajustado} from  './servicos/servico.js'

const app = express();

app.get('/historicoIPCA', (req, res) => {
    const ano = req.query.ano;
    const resultado = ano ? buscar_ipcaPorAno(ano): buscar_td_Dados_ipca();
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({"erro": "Nenhum historico encontrado para o ano especificado."});
    }
});
app.get('/historicoIPCA/:id', (req,res) => {
    const id = buscar_ipca_porId(req.params.id);
    if(id){
        res.json(id);
    } else if (isNaN(parseInt(req.params.id))){
        res.status(400).send({'erro' : 'Requisição inválida'});
    } else {
        res.status(404).send({'erro': 'Elemento não encontrado.'});
    }
});

app.get('/historicoIPCA/calculo', (req, res) => {
    const {valor , mesInicial, anoInicial, mesFinal, anoFinal} = req.query;
    
    if (!valor || !mesInicial || !anoInicial || !mesFinal ||!anoFinal){
        res.status(400).json({'erro': 'Parâmentros inválidos.'});
    }
    try{
        const resultado = valor_reajustado(
            parseFloat(valor),
            parseInt(mesInicial),
            parseInt(anoInicial),
            parseInt(mesFinal),
            parseInt(anoFinal)
        );
        res.json({valor_reajustado: resultado});
    } catch (error){
        res.status(400).json({erro: error.message});
    }
    
    
});


app.listen(8080,() => {
    console.log('Servidor iniciado na porta 8080');
});
