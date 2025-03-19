const express = require('express');  //MUITO importante explicar
const app = express();
const cors = require('cors'); //MUITO importante explicar
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000;
app.use(cors()); //importante explicar
app.use(express.json()); //importante explicar





//Explicar o metodo get do http
app.get('/personagens', async (req, res) => {
  const personagens = await prisma.personagem.findMany();
  res.status(200).json(personagens);
});

//Explicar o metodo post do http
app.post('/personagens', async (req, res) => {
    const {nome, casa} = req.body;
    try {
        const novoPersonagem = await prisma.personagem.create({
            data:{nome, casa}
        })
        res.status(201).json(novoPersonagem) //explicar os status do http
    } catch (error) {
        console.log(error);
    }
});

//explicar put do http
//explicar como o http reconhece o id
app.put('/personagem/:id', async(req, res)=>{
    const {id} = req.params;
    const {nome, casa} = req.body;
    try {
        const personagemAtualizado = await prisma.personagem.update({
            where: {id_personagem: id},
            data: {nome, casa}
        })
        res.status(200).json(personagemAtualizado)
    } catch (error) {
        console.log(error);
    }
})

//explicar o patch e a diferença em relação ao put
app.patch('/personagem/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, casa } = req.body;

    try {
        const personagemAtualizado = await prisma.personagem.update({
            where: { id_personagem: id },
            data: {
                ...(nome && { nome }),
                ...(casa && { casa })
            }
        });

        res.status(200).json(personagemAtualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar o personagem." });
    }
});
//explicar metodo delete no http
app.delete('/personagem/:id', async (req, res) =>{
    const {id} = req.params;
    try {
        await prisma.personagem.delete({
            where: {id_personagem: id}
        })
        res.status(204).send();
    } catch (error) {
        console.log(error);
    }
})
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app, server };