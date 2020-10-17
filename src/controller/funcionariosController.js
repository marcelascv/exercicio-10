// passo-a-passo

// 1: importar o JSON de funcionarios
// 2: criar o método para buscar todos os funcionarios
// 3: exportar o método

// ./ retorna arquivos ou pastas do mesmo diretório
// ../ retorna arquivos ou pastas de um diretório acima
// ../../ subir mais um nível e quando mais você colocar mais níveis vai subindo

const funcionarios = require('../model/funcionarios.json');
const fs = require('fs');

const getAll = (req, res) => {
    console.log(req.url);
    // verifica se a resposta tem status 200 (sucesso) e envia o JSON
    res.status(200).send(funcionarios);
}

// passo-a-passo

// 1: criar método getByID
// 2: retornar o item daquele ID
// filter ele vai buscar todos os itens que passar na validação
// nesse caso aqui o ideal é que o ID seja único e vai retornar
// então o melhor é usar o método find, porque ele vai retornar o primeiro item que ele achar naquela condição

const getByID = (req, res) => {
    const id = req.params.id

    // método find retorna o primeiro elemento que passa na condição
    const funcionarioFiltrado = funcionarios.find((funcionario) => funcionario.id == id)

    res.status(200).send(funcionarioFiltrado)
}

// passo-a-passo

// 1: criar método getAllNames
// 2: retornar somente o nome dos funcionarios da lista de funcionarios

const getAllNames = (req, res) => {
    const nomes = funcionarios.map((funcionario) => funcionario.nome)

    res.status(200).send(nomes)
}

// passo-a-passo

// 1: criar uma função
// 2: atribuir dois parâmetros (requisição e resposta)
// 3: criar o corpo da função

const postFuncionario = (req, res) => {
    console.log(req.body);
    const { id, nome, dataAdmissao, cargo} = req.body;
    funcionarios.push({ id, nome, dataAdmissao, cargo});

    fs.writeFile('./src/model/funcionarios.json', JSON.stringify(funcionarios), 'utf8', function(err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log('Arquivo atualizado com sucesso!');
    });

    res.status(201).send(funcionarios)
};

const deleteFuncionario = (req, res) => {
    const id = req.params.id;
    const funcionarioFiltrado = funcionarios.find((funcionario) => funcionario.id == id);
    const index = funcionarios.indexOf(funcionarioFiltrado);
    funcionarios.splice(index, 1);

    fs.writeFile('./src/model/funcionarios.json', JSON.stringify(funcionarios), 'utf8', function(err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log('Arquivo atualizado com sucesso!');
    });    

    res.status(200).send(funcionarios);
};

module.exports = { getAll, getByID, getAllNames, postFuncionario, deleteFuncionario }