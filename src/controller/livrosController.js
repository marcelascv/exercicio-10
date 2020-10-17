// passo-a-passo

// 1: importar o JSON de livros
// 2: criar o método para buscar todos os livros
// 3: exportar o método

// ./ retorna arquivos ou pastas do mesmo diretório
// ../ retorna arquivos ou pastas de um diretório acima
// ../../ subir mais um nível e quando mais você colocar mais níveis vai subindo

const livros = require('../model/livros.json');
const fs = require('fs');

const getAll = (req, res) => {
    console.log(req.url);
    // verifica se a resposta tem status 200 (sucesso) e envia o JSON
    res.status(200).send(livros);
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
    const livroFiltrado = livros.find((livro) => livro.id == id)

    res.status(200).send(livroFiltrado)
}

// passo-a-passo

// 1: criar método getAllTitles
// 2: retornar somente o nome dos titulos da lista de livros

const getAllTitles = (req, res) => {
    const titulos = livros.map((livro) => livro.titulo)

    res.status(200).send(titulos)
}

// passo-a-passo

// 1: criar uma função
// 2: atribuir dois parâmetros (requisição e resposta)
// 3: criar o corpo da função

const postLivro = (req, res) => {
    console.log(req.body);
    const { id, titulo, dataPublicacao, pessoaAutora, assunto} = req.body;
    livros.push({ id, titulo, dataPublicacao, pessoaAutora, assunto});

    fs.writeFile('./src/model/livros.json', JSON.stringify(livros), 'utf8', function(err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log('Arquivo atualizado com sucesso!');
    });

    res.status(201).send(livros)
};

const deleteLivro = (req, res) => {
    const id = req.params.id;
    const livroFiltrado = livros.find((livro) => livro.id == id);
    const index = livros.indexOf(livroFiltrado);
    livros.splice(index, 1);

    fs.writeFile('./src/model/livros.json', JSON.stringify(livros), 'utf8', function(err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log('Arquivo atualizado com sucesso!');
    });    

    res.status(200).send(livros);
};

module.exports = { getAll, getByID, getAllTitles, postLivro, deleteLivro }