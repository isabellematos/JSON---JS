/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle
 * Data Criacao: 27/10/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/

 const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js')


 //funcao para gerar um novo curso
 const novoCurso = async function (curso) {
 
     const mensagem = {};
 
     //validacao de campos obrigatórios  
     if (curso.nome == undefined || curso.nome == '' || curso.carga_horaria == '' || curso.carga_horaria == undefined ) {
         return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};

     }else { //import da model de curso
         const novoCurso = require('../model/DAO/curso.js');
 
         //funcao para inserir um novo curso
         const result = await novoCurso.insertCurso(curso);
 
         if (result) {
             return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
         } else 
             return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
       }
    }
     
 //funcao para atualizar um registro
 const atualizarCurso = async function (curso) {
 
 
     //validacao para o id como campo obrigatorio
     if (curso.id == '' || curso.id == undefined)
             return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
     //validacao de campos obrigatórios  
     else if (curso.nome == undefined || curso.nome == '' || curso.carga_horaria == '' || curso.carga_horaria == undefined) {
         return {status:400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
     }
     else 
     {
         //import da model de curso
         const atualizarCurso = require('../model/DAO/curso.js');
  
         //funcao para atualizar um curso
         const result = await atualizarCurso.updateCurso(curso);
 
         if (result) {
             return {status: 201, message: MESSAGE_SUCCESS.UPDATE_ITEM};
         } else 
             return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
     }
 
 }
 
 //funcao para excluir um registro
 const excluirCurso = async function (id) {
 
     //validacao para o id como campo obrigatorio
     if (id == '' || id == undefined)
     return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
     else{
         //validacao para verificar se ID existe no BD
         const curso = await buscarCurso(id);
         //valida se foi encontrado um registro valido
         if (curso){ 
     
             const deletarCurso = require('../model/DAO/curso.js')
 
             //funcao para deletar um curso
             const result = await deletarCurso.deleteCurso(id);
 
             if (result) {
                 return {status: 201, message: MESSAGE_SUCCESS.DELETE_ITEM};
             } else 
                 return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
         } else {
             return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
         }
 
         
     }
 }
 
 //funcao para retornar todos os registros
 const listarCursos = async function () {
     let dadosCursosJSON = {};
 
     const { selectAllCursos } = require ('../model/DAO/curso.js');
 
     const dadosCursos = await selectAllCursos();
     
     if (dadosCursos)
     {
         //Conversao do tipo de dados BigInt para Int(????)
         dadosCursos.forEach(element => {
         element.id = Number(element.id)
     });
     //Criamos uma chave no JSON para retornar o array de cursos
     dadosCursosJSON.cursos = dadosCursos;
 
     return dadosCursosJSON;
     }
     else 
         return false
 }
 
 //funcao para escolher curso por id
 const buscarCurso = async function (id) {
     let dadosCursosJSON = {};
 
     if (id == '' && id == undefined)
         return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
     else{
 
     const { selectCursoById } = require ('../model/DAO/curso.js');
 
     const dadosCurso = await selectCursoById(id);
 
     
     if (dadosCurso)
     {
         //Conversao do tipo de dados BigInt para Int(????)
         dadosCurso.forEach(element => {
         element.id = Number(element.id)
     });
     //Criamos uma chave no JSON para retornar o array de cursos
     dadosCursosJSON.cursos = dadosCurso;
 
     return dadosCursosJSON;
     }
     else 
         return false
     }
 }
 
 module.exports = {
     listarCursos,
     novoCurso,
     atualizarCurso,
     excluirCurso,
     buscarCurso
 }