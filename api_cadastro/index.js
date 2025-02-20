import express from "express";
import cors  from "cors";
import { cadastraDados } from "./servico/cadastro_servico.js";


const app = express();
app.use(cors());
app.use(express.json());

app.post('/usuarios', async (req, res) =>{
    const[nome, email, telefone] = req.body;
    await cadastraDados(nome, email, telefone);
    res.status(204).send({"Mensagem" : "Cadastro efetivado com sucesso"});
})

app.listen(9000, async() =>{
    const data = new Date();
    console.log('Servidor iniciado na porta' + data)
}
)