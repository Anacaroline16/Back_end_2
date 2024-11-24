import  express  from "express";
import {buscar_td_Dados_ipca, buscar_ipcaPorAno, buscar_ipca_porId, valor_reajustado} from  './servicos/servico.js'

const app = express();




app.get('/historicoIPCA/calculo', (req, res) => {
    const { valor, mesInicial, anoInicial, mesFinal, anoFinal } = req.query;

    if (!valor || !mesInicial || !anoInicial || !mesFinal || !anoFinal || 
        isNaN(valor) || isNaN(mesInicial) || isNaN(anoInicial) || isNaN(mesFinal) || isNaN(anoFinal)) {
        return res.status(400).json({ 'erro': 'Parâmetros inválidos ou não numéricos.' });
    }

    const valorConvertido = parseFloat(valor);
    const mesInicialConvertido = parseInt(mesInicial);
    const anoInicialConvertido = parseInt(anoInicial);
    const mesFinalConvertido = parseInt(mesFinal);
    const anoFinalConvertido = parseInt(anoFinal);

    console.log("Parâmetros válidos:", valorConvertido, mesInicialConvertido, anoInicialConvertido, mesFinalConvertido, anoFinalConvertido);

    try {
        const resultado = valor_reajustado(
            valorConvertido,
            mesInicialConvertido,
            anoInicialConvertido,
            mesFinalConvertido,
            anoFinalConvertido
        );
        res.json({ valor_reajustado: resultado });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});


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




app.listen(8080,() => {
    console.log('Servidor iniciado na porta 8080');
});
