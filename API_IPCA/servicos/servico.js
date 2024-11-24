import historicoInflacao from "../dados/dados.js";

export const buscar_td_Dados_ipca = () => {
    return historicoInflacao;
}
export const buscar_ipcaPorAno = (ano) => {
    return historicoInflacao.filter(ipca => ipca.ano == ano);
}
export const buscar_ipca_porId = (id) => {
    const idipca = parseInt(id);
    return historicoInflacao.find(ipca => ipca.id === idipca);
}