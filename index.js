const express = require('express');
const app = express();
const cors = require('cors'); 
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const port = 3000;
app.use(cors()); 
app.use(express.json()); 


app.get('/personagens', async (req, res) => {
  const personagens = await prisma.personagem.findMany();
  res.status(200).json(personagens);
});

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

app.delete('/personagem/:id', async (req, res) =>{
    const {id} = req.params;
    try {
        const personagemDeletado = await prisma.personagem.delete({
            where: {id_personagem: id}
        })
        res.json(personagemDeletado);
    } catch (error) {
        console.log(error);
    }
})
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app, server };