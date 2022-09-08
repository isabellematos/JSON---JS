// Import da bibioteca do express para criar API
const express = require('express');

// Import da bibioteca do cors para manipular as permissoes do protocolo http
const cors = require('cors');

// Import da bibioteca do body-parser para manipular o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser');

const { getLivro } = require('./modulo/livros.js');

const app = express();


// request - receber dados
// response - devolver dados
app.use((request, response, next) => {
    //Permite especificar quem serao os IPS que podem acessar a API (* = todos)
    response.header('Access-Control-Allow-Origin', '*');
    //Permite especificar quais serao os verbos(metodos) que a API ira reconhecer
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //Estabelece que as permissoes acima serao representadas pelo cors
    app.use(cors());

    //Da continuidade ao restante da programacao
    next();
 
});

app.get('/livros/:palavra', cors(), async function(request, response,next){

    // recebe a sigla do estado encaminhado no endpoint
    let palavra = request.params.palavra;
    // Chama a funcao de cidades para buscar cidades pela sigla do estado
    let livros = getLivro(palavra)
    let bookJSON = {}

    //conferir se a funçao retorna algo
    if(livros)
    {
        bookJSON.livros = livros
        response.status(200);
        response.json(livros)
    }else{
        response.status(404) 
    }
   

});

//Para que os endpoints posssam estar funcionando, precisamos obrigatoriamente finalizar a API com essa function, que representa o start da API
app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes.')
})