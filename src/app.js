// passo-a-passo

// 1: importar o express
// 2: declarar a variavel app atribuindo o método do express
// 3: importar a rota
// 4: usar a rota criada
// 5: exportar o app

const express = require('express');
const bodyParser = require(('body-parser'));
const app = express();

const livros = require('./routes/livrosRoutes');
// importar a rota de funcionarios
const funcionarios = require('./routes/funcionariosRoutes');

// configurar body parser
app.use(bodyParser.json());
//app.use(express.json());

// / é um endpoint
//  livros é a rota
app.use('/', livros);
// usar a rota de funcionarios
app.use('/', funcionarios);

// * significa qualquer coisa que não seja o que a gente já mapeou no caso
// se retornar o status for 404, você vai enviar esse arquivo aqui no diretório
app.get('*', (req, res) => {
    res.status(404).sendFile('./views/404.html', { root:__dirname })
})

module.exports = app