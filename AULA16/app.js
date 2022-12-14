/*****************************************************************************************************************
 * Objetivo: API responsavel pela manipulacao de dados do back end
    (GET, POST, PUT, DELETE)
 * Autora: Isabelle
 * Data Criacao: 10/10/2022
 * Versao: 1.0
 * 
 * 
 * Anotacoes:
 
    //Para manipular o acesso ao BD podemos utilizar o Prisma
    //Para instalar o prisma, devemos rodar os seguintes comandos
    //npm install prisma --save
    //npx prisma
    //npx prisma init
    //npm install @prisma/client
 *****************************************************************************************************************/

//Import das bibliotecas
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { request, response } = require('express');
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulo/config.js')

const app = express();

//configuracao de cors para liberar a API
app.use((request, response, next) => {
    response.header ('Access-Control-Allow-Origin', '*');
    response.header ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    app.use(cors());
    next();

});

//Criamos um objeto que permite receber um json no body das requisicoes
const jsonParser = bodyParser.json()

/***************************************************************** 
    Rotas para CRUD - (Create, Read, Update, Delete) de alunos
    Data: 10/10/2022
******************************************************************/
//EndPoint para listar todos os alunos
app.get('/v1/alunos', cors(), async function (request, response){

    let statusCode;
    let message;


    //import do arquivo controllerAluno
    const controllerAluno = require('./controller/controllerAluno.js');

    //Retorna todos os alunos existentes no banco de dados
    const dadosAlunos = await controllerAluno.listarAlunos();

    if (dadosAlunos)
    {
        statusCode = 200
        message = dadosAlunos;
    } else {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    //Retorna os dados da API
    response.status (statusCode);
    response.json(message);

});

//EndPoint para inserir um novo aluno
app.post('/v1/aluno', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type']
    //console.log(headerContentType);

    //validar se o content type é do tipo application/json
    if (headerContentType == 'application/json') {
        //recebe conteudo do corpo da mensagem
        let dadosBody = request.body;
        
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}' ) 
        {
            //import do arquivo da controller de aluno
            const controllerAluno = require('./controller/controllerAluno.js')
            //chama funcao novoAluno da controller e encaminha  os dados do body
            const novoAluno = await controllerAluno.novoAluno(dadosBody);

            statusCode = novoAluno.status;
            message = novoAluno.message;
            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY
        }


    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode);
    response.json(message)

});

//EndPoint para atualizar um aluno existente
app.put('/v1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type']
    //console.log(headerContentType);

    //validar se o content type é do tipo application/json
    if (headerContentType == 'application/json') {
        //recebe conteudo do corpo da mensagem
        let dadosBody = request.body;
        
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}' ) 
        {
            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            //validacao do ID na requisicao
            if (id != '' && id != undefined)
            {
                // adiciona o id no JSON que chegou do corpo da requisicao
                dadosBody.id = id;
                //import do arquivo da controller de aluno
                const controllerAluno = require('./controller/controllerAluno.js')
                //chama funcao novoAluno da controller e encaminha  os dados do body
                const atualizarAluno = await controllerAluno.atualizarAluno(dadosBody);

                statusCode = atualizarAluno.status;
                message = atualizarAluno.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            } 

        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY
        }


    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode);
    response.json(message)
});

//EndPoint para deletar um aluno existente
app.delete('/v1/aluno/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;

            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            //validacao do ID na requisicao
            if (id != '' && id != undefined)
            {
                //import do arquivo da controller de aluno
                const controllerAluno = require('./controller/controllerAluno.js')
                
                //chama a funcao de excluir aluno
                const deletarAluno = await controllerAluno.excluirAluno(id);

                statusCode = deletarAluno.status;
                message = deletarAluno.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            } 


    response.status(statusCode);
    response.json(message)
});

//EndPoint para buscar um aluno pelo ID
app.get('/v1/aluno/:id', cors(), async function (request, response){

    let statusCode;
    let message;
    let id = request.params.id


    //validacao do ID na requisicao
        if (id != '' && id != undefined){

            //import do arquivo controllerAluno
            const controllerAluno = require('./controller/controllerAluno.js');

            //Retorna todos os alunos existentes no banco de dados
            const dadosAluno = await controllerAluno.buscarAluno(id);

            if (dadosAluno)
            {
                statusCode = 200
                message = dadosAluno;
            } else {
                statusCode = 404;
                message = MESSAGE_ERROR.NOT_FOUND_DB
            }
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.REQUIRED_ID
        }
    //Retorna os dados da API
    response.status (statusCode);
    response.json(message);

});

/***************************************************************** 
    Rotas para CRUD - (Create, Read, Update, Delete) de cursos
    Data: 27/10/2022
******************************************************************/

//EndPoint para listar todos os cursos
app.get('/v1/cursos', cors(), async function (request, response){

    let statusCode;
    let message;


    //import do arquivo controllerCurso
    const controllerCurso = require('./controller/controllerCurso.js');

    //Retorna todos os cursos existentes no banco de dados
    const dadosCursos = await controllerCurso.listarCursos();

    if (dadosCursos)
    {
        statusCode = 200
        message = dadosCursos;
    } else {
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB
    }

    //Retorna os dados da API
    response.status (statusCode);
    response.json(message);
});

//EndPoint para inserir um novo curso
app.post('/v1/curso', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type']

    //validar se o content type é do tipo application/json
    if (headerContentType == 'application/json') {
        //recebe conteudo do corpo da mensagem
        let dadosBody = request.body;
        
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}' ) 
        {
            //import do arquivo da controller de curso
            const controllerCurso = require('./controller/controllerCurso.js')
            //chama funcao novoAluno da controller e encaminha  os dados do body
            const novoCurso = await controllerCurso.novoCurso(dadosBody);

            statusCode = novoCurso.status;
            message = novoCurso.message;
            
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY
        }


    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode);
    response.json(message)

});

//EndPoint para atualizar um curso existente
app.put('/v1/curso/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe o tipo de content type que foi enviado no header da requisicao
    headerContentType = request.headers['content-type']
    //console.log(headerContentType);

    //validar se o content type é do tipo application/json
    if (headerContentType == 'application/json') {
        //recebe conteudo do corpo da mensagem
        let dadosBody = request.body;
        
        //realiza um processo de conversao de dados para conseguir comparar o json vazio
        if (JSON.stringify(dadosBody) != '{}' ) 
        {
            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            //validacao do ID na requisicao
            if (id != '' && id != undefined)
            {
                // adiciona o id no JSON que chegou do corpo da requisicao
                dadosBody.id = id;
                //import do arquivo da controller de curso
                const controllerCurso = require('./controller/controllerCurso.js')
                //chama funcao novoAluno da controller e encaminha  os dados do body
                const atualizarCurso = await controllerCurso.atualizarCurso(dadosBody);

                statusCode = atualizarCurso.status;
                message = atualizarCurso.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            } 

        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY
        }


    }else{
        statusCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE
    }

    response.status(statusCode);
    response.json(message)
});

//EndPoint para deletar um curso existente
app.delete('/v1/curso/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;

            //recebe o id enviado por parametro na requisicao
            let id = request.params.id

            //validacao do ID na requisicao
            if (id != '' && id != undefined)
            {
                //import do arquivo da controller de aluno
                const controllerCurso = require('./controller/controllerCurso.js')
                
                //chama a funcao de excluir aluno
                const deletarCurso = await controllerCurso.excluirCurso(id);

                statusCode = deletarCurso.status;
                message = deletarCurso.message;
            }else{
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            } 


    response.status(statusCode);
    response.json(message)
});

//EndPoint para buscar um curso pelo ID
app.get('/v1/curso/:id', cors(), async function (request, response){

    let statusCode;
    let message;
    let id = request.params.id


    //validacao do ID na requisicao
        if (id != '' && id != undefined){

            //import do arquivo controllerCurso
            const controllerCurso = require('./controller/controllerCurso.js');

            //Retorna todos os cursos existentes no banco de dados
            const dadosCurso = await controllerCurso.buscarCurso(id);

            if (dadosCurso)
            {
                statusCode = 200
                message = dadosCurso;
            } else {
                statusCode = 404;
                message = MESSAGE_ERROR.NOT_FOUND_DB
            }
        }else{
            statusCode = 400;
            message = MESSAGE_ERROR.REQUIRED_ID
        }
    //Retorna os dados da API
    response.status (statusCode);
    response.json(message);

});


//Ativa o servidor para receber requisicoes http
app.listen(8080, function(){
   console.log('Servidor aguardando requisicoes')
})

