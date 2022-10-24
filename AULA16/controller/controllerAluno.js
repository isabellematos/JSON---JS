/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autor: Isabelle
 * Data Criacao: 06/10/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')


//funcao para gerar um novo aluno
const novoAluno = async function (aluno) {

    const mensagem = {};

    //validacao de campos obrigatórios  
    if (aluno.nome == undefined || aluno.nome == '' || aluno.foto == '' || aluno.foto == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined ) {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    //validacao para verificar email valido
    }else if (!aluno.email.includes('@')) 
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de aluno
        const novoAluno = require('../model/DAO/aluno.js');

        //funcao para inserir um novo aluno
        const result = await novoAluno.insertAluno(aluno);

        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else 
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }
}

//funcao para atualizar um registro
const atualizarAluno = async function (aluno) {


    //validacao para o id como campo obrigatorio
    if (aluno.id == '' || aluno.id == undefined)
            return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
    //validacao de campos obrigatórios  
    if (aluno.nome == undefined || aluno.nome == '' || aluno.foto == '' || aluno.foto == undefined || aluno.cpf == '' || aluno.cpf == undefined || aluno.email == '' || aluno.email == undefined || aluno.data_nascimento == '' || aluno.data_nascimento == undefined )  {
        return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

    //validacao para verificar email valido
    }else if (!aluno.email.includes('@')) 
        return {status: 400, message: MESSAGE_ERROR.INVALID_EMAIL};
    else
    {
        //import da model de aluno
        const atualizarAluno = require('../model/DAO/aluno.js');
 
        //funcao para atualizar um aluno
        const result = await atualizarAluno.updateAluno(aluno);

        if (result) {
            return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else 
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
    }

}

//funcao para excluir um registro
const excluirAluno = async function (id) {

    //validacao para o id como campo obrigatorio
    if (id == '' && id == undefined)
    return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}

    const deletarAluno = require('../model/DAO/aluno.js')

     //funcao para atualizar um aluno
     const result = await deletarAluno.deleteAluno(id);

     if (result) {
         return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM};
     } else 
         return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
 }


//funcao para retornar todos os registros
const listarAlunos = async function () {
    let dadosAlunosJSON = {};


    const { selectAllAlunos } = require ('../model/DAO/aluno.js');

    const dadosAlunos = await selectAllAlunos();

    

    if (dadosAlunos)
    {
        //Conversao do tipo de dados BigInt para Int(????)
        dadosAlunos.forEach(element => {
        element.id = Number(element.id)
    });
    //Criamos uma chave no JSON para retornar o array de alunos
    dadosAlunosJSON.alunos = dadosAlunos;

    return dadosAlunosJSON;
    }
    else 
        return false
}

//funcao para escolher aluno por id
const buscarAluno = async function (id) {
    let dadosAlunoJSON = {};

    if (id == '' && id == undefined)
        return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
    else{

    const { selectAlunoById } = require ('../model/DAO/aluno.js');

    const dadosAluno = await selectAlunoById(id);

    
    if (dadosAluno)
    {
        //Conversao do tipo de dados BigInt para Int(????)
        dadosAluno.forEach(element => {
        element.id = Number(element.id)
    });
    //Criamos uma chave no JSON para retornar o array de alunos
    dadosAlunoJSON.aluno = dadosAluno;

    return dadosAlunoJSON;
    }
    else 
        return false
    }
}

module.exports = {
    listarAlunos,
    novoAluno,
    atualizarAluno,
    excluirAluno,
    buscarAluno
}