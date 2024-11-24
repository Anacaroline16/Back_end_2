import historicoInflacao from "../dados/dados.js";

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

export const valor_reajustado = (valor , mesInicial , anoInicial, mesFinal, anoFinal ) => {

    
    if (!valor || valor <= 0){
        throw new Error('O valor inicial deve ser maior que 0.');
    }
    if (anoInicial> anoFinal || (anoInicial===anoFinal && mesInicial> mesFinal)){
        throw new Error('O intervalo de datas é inválido .');
    }

    const dadosFiltrados = historicoInflacao.filter((ipca) => {
        return(
            (ipca.ano >  anoInicial && ipca.ano < anoFinal) ||
            (ipca.ano === anoInicial && ipca.mes >= mesInicial) ||
            (ipca.ano === anoFinal && ipca.mes <= mesFinal) 
        );
    });

    if (dadosFiltrados.length === 0){
       throw new Error('Nenhum índice encontrado para os dados fornecido.');
    };
    let resultado = valor;
    dadosFiltrados.forEach((ipca) => {
        resultado *= 1 + ipca.valor / 100;
    });
    
    return resultado;
};