const express = require('express');

const app = express();

const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json()); // Para parsear JSON no corpo das requisições
app.use('/api', usuarioRoutes);

// const porta = process.env.PORT || 3333;
const porta = 3333;

app.listen(porta, ()=>{
    console.log('Servidor iniciado na porta '+ porta);
    // console.log(`Servidor iniciado na porta ${porta}`);
});

app.get('/', (request, response) => {
    response.send('Hello World');
});