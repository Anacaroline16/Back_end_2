function validaNome(nome) {
    const regexNome = /^[a-zA-ZÀ-ÿ\s\-']+$/;
    const isvalid = nome.length >= 2 && regexNome.test(nome);
    return isvalid;
}

function validaEmail(email){
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isvalid = regexEmail.test(email);
    return isvalid

}

export function validaUsuario(nome, email) {
    const nomeValido = validaNome(nome);
    const emailValido = validaEmail(email);

    const usuario_valido = nomeValido && emailValido;

    if (usuario_valido){
        return{status: true, mensagem: ''};
    }
    else{
        return {status: false, mensagem: 'Nome e/ou Email Inválido(s)'};

    }
}