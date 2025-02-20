import express from "express";
import cors  from "cors";
import { cadastraDados } from "./servico/cadastro_servico.js";
import { validaUsuario } from "./servico/validacao/valida.js";


const app = express();
app.use(cors());
app.use(express.json());



app.post('/usuarios', async (req, res) =>{
    const{nome, email} = req.body;

    // if (!nome || nome.lengt < 2){
    //     return res.status(400).json()
    // }
    const usuario_valido = validaUsuario(nome, email);

    if (usuario_valido.status) {
        await cadastraDados(nome,email);
        req.status(204).end();
    } else {
        res.status(400).send({mensagem: usuario_valido.mensagem})
    }
    // await cadastraDados(nome, email);
    // res.status(200).send({"Mensagem" : "Cadastro efetivado com sucesso"});
})

app.listen(9000, async() =>{
    const data = new Date();
    console.log('Servidor iniciado na porta' + data)
}
)