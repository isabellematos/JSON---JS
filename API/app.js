/**
 *  Bibliotecas necessarias para criar uma API
 * 
 *  É uma biblioteca para criar aplicacoes em node no formato de API
 *      express - npm install express --save
 *      
 *          É uma biblioteca para manipular as permissoes do protocolo http
 *          cors - npm install cors --save
 *              
 *              É uma biblioteca que permite manipular o corpo do protocolo http()
 *                  body-parser - npm install body-parser --save
 */

 

// Import da bibioteca do express para criar API
const express = require('express');

// Import da bibioteca do cors para manipular as permissoes do protocolo http
const cors = require('cors');

// Import da bibioteca do body-parser para manipular o corpo das requisicoes do protocolo http
const bodyParser = require('body-parser');
//import do arquivo de estados
const { getEstados, getEstado } = require('./modulo/estados.js');
const { getCidade } = require('./modulo/cidades.js');

// cria um objeto chamado app que sera especialista nas funcoes do express
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


//EndPoints: listagem de Estados
//async usado para que a funcao funcione no tempo certo, sem pular ou deixar de ler algum processo que demore mais para ser compilado
app.get('/estados', cors(), async function(request, response,next){

   let estados = getEstados();

   //Cria uma variavel do tipo JSON
    let estadosJSON = {}


   if (estados)
   {
       //criamos uma chave chamada uf, para receber o array de estados
    estadosJSON.sigla = estados;
    response.status(200);
    response.json(estadosJSON)
   }else{
       response.status(404);
       response.json('{message : "nenhum item encontrado"}')
   }

});

// EndPoint - Busca informacoes de um estado pela sigla
app.get('/estado/:sigla', cors(), async function(request, response, next){
    // recebe a sigla enviada por parametro no endpoint (:sigla)
    let sigla = request.params.sigla;
    // Chama a funcao que vai localizar o estado solicitado
    let estado = getEstado(sigla)

    if(estado)
    {
        response.status(200);
        response.json(estado)
    }else{
        response.status(404)
    }

});

app.get('/cidades/:sigla', cors(), async function(request, response,next){

    // recebe a sigla do estado encaminhado no endpoint
    let sigla = request.params.sigla;
    // Chama a funcao de cidades para buscar cidades pela sigla do estado
    let cidades = getCidade(sigla)
    let cidadesJSON = {}

    //conferir se a funçao retorna algo
    if(cidades)
    {
        cidadesJSON.cidades = cidades
        response.status(200);
        response.json(cidades)
    }else{
        response.status(404)
    }
   

});


//Para que os endpoints posssam estar funcionando, precisamos obrigatoriamente finalizar a API com essa function, que representa o start da API
app.listen(8080, function(){
    console.log('Servidor aguardando requisicoes.')
})