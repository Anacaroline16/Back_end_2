import historicoInflacao from "../dados/dados.js";


export function valor_reajustado(valor, mesInicial, anoInicial, mesFinal, anoFinal, dadosFil_historico) {
    console.log('dadosrecebidos na funcao', dadosFil_historico);
    const historicoFiltrado = dadosFil_historico.filter(dado => 
        (dado.ano > anoInicial || (dado.ano === anoInicial && dado.mes >= mesInicial)) &&
        (dado.ano < anoFinal || (dado.ano === anoFinal && dado.mes <= mesFinal))
    );

    if (historicoFiltrado.length === 0) {
        throw new Error('Nenhum índice encontrado para os dados fornecidos.');
    }

    return historicoFiltrado.reduce((acc, dado) => acc * (1 + dado.ipca / 100), valor).toFixed(2);
}
  


export const buscar_td_Dados_ipca = () => {
    return historicoInflacao;
}
export const buscar_ipcaPorAno = (ano) => {
    return historicoInflacao.filter((ipca) => ipca.ano == parseInt(ano));
}
export const buscar_ipca_porId = (id) => {
    const idipca = parseInt(id);
    return historicoInflacao.find((ipca) => ipca.id === idipca);
}

