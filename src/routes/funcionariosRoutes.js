// passo-a-passo

// 1: importar o express
// 2: importar o router
// 3: importar o controller
// 4: criar a rota que traz todosos itens 
// 5: exportar o router

const express = require('express');
const route = express.Router();
const controller = require('../controller/funcionariosController');

route.get('/funcionarios', controller.getAll);
route.get('/funcionarios/:id', controller.getByID);
route.get('/titulos', controller.getAllNames);
route.post('/funcionarios', controller.postFuncionario);
route.delete('/funcionarios/:id', controller.deleteFuncionario);
route.put("/funcionarios/:id", controller.putFuncionario);
route.patch("/funcionarios/:id", controller.patchFuncionario);

module.exports = route