import historicoInflacao from "../dados/dados.js";

export const buscar_td_Dados_ipca = () => {
    return historicoInflacao;
}
export const buscar_ipcaPorAno = (historico_total) => {
    return historicoInflacao.filter(ipca => ipca.ano == historico_total);
}
export const buscar_ipca_porId = (id) => {
    const idUF = parseInt(id);
    return colecaoUf.find(uf => uf.id === idUF);
}