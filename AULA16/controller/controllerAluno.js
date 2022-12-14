/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle
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
        //import da model alunoCurso
        const novoAlunoCurso = require('../model/DAO/aluno_curso.js')

        //chama funcao para inserir um  novo aluno
        const resultNovoAluno = await novoAluno.insertAluno(aluno);

        //verifica se os dados do novo aluno foi inserido no BD
        if(resultNovoAluno) {
            //chama a funcao que verifica qual o id gerado para o novo aluno
            let idNovoAluno = await novoAluno.selectLastId();

            if(idNovoAluno > 0)
            {
                //cria um objeto JSON
                let alunoCurso = {};

                //retorna o ano corrente
                let anoMatricula = new Date().getFullYear();

                // cria a matricula do aluno (id_aluno + id_curso + ano corrente)
                let numero_matricula = `${idNovoAluno}${aluno.curso[0].id_curso}${anoMatricula}`
                // cria objeto JSON com todos as chaves e valores
                alunoCurso.id_aluno = idNovoAluno;
                alunoCurso.id_curso = aluno.curso[0].id_curso;
                alunoCurso.matricula = numero_matricula;
                alunoCurso.status_aluno = 'Cursando';

                //chama a funcao para inserir na tabela alunoCurso
                const resultNovoAlunoCurso = await novoAlunoCurso.insertAlunoCurso(alunoCurso);

            if(resultNovoAlunoCurso)
                return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
            else {
                //Caso aconteça um erro nesse processo, obrigatoriamente
                //devera ser excluido do banco de dados o registro do aluno.
                await excluirAluno(idNovoAluno)
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
            }

        }else{
                //Caso aconteça um erro nesse processo, obrigatoriamente
                     //devera ser excluido do banco de dados o registro do aluno.
                    await excluirAluno(idNovoAluno)
                    return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
            }
        }else 
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
    if (id == '' || id == undefined)
    return {status: 400, MESSAGE: MESSAGE_ERROR.REQUIRED_ID}
    else{
        //validacao para verificar se ID existe no BD
        const aluno = await buscarAluno(id);
        //valida se foi encontrado um registro valido
        if (aluno){
    
            const deletarAluno = require('../model/DAO/aluno.js')

            //funcao para deletar um aluno
            const result = await deletarAluno.deleteAluno(id);

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
const listarAlunos = async function () {
    let dadosAlunosJSON = {}; 
    //let alunosCursoArray = [];


    //import da model de aluno e aluno curso
    const { selectAllAlunos } = require ('../model/DAO/aluno.js');
    const { selectAlunoCurso } = require ('../model/DAO/aluno_curso.js');

    //busca todos os alunos
    const dadosAlunos = await selectAllAlunos();

    if (dadosAlunos)
    {

        const alunosCursoArray = dadosAlunos.map(async itemAluno => {
            //Busca dados de acordo ao curso do aluno
            const dadosAlunoCurso = await selectAlunoCurso(itemAluno.id);

            if(dadosAlunoCurso)
            //Acrescenta uma chave curso e coloca os dados do curso do aluno
            itemAluno.curso = dadosAlunoCurso;

            //Adiciona no array cada elemento contendo dados do aluno e o seu curso
            //alunosCursoArray.push(itemAluno);

            return itemAluno;
        });

        //Criamos uma chave no JSON para retornar o array de alunos
        dadosAlunosJSON.alunos = await Promise.all (alunosCursoArray);

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

    //import das models aluno e alunoCurso
    const { selectAlunoById } = require ('../model/DAO/aluno.js');
    const { selectAlunoCurso } = require('../model/DAO/aluno_curso.js');

    const dadosAluno = await selectAlunoById(id);

    
    if (dadosAluno)
    {
        const dadosAlunoCurso = await selectAlunoCurso(id);

        if (dadosAlunoCurso){
            //adiciona a chave curso dentro do objeto dos dados do aluno e acrescenta os dados do curso do aluno
                dadosAluno[0].curso = dadosAlunoCurso;

                dadosAlunoJSON.aluno = dadosAluno

                return dadosAlunoJSON;
        }else {
            dadosAlunoJSON.aluno = dadosAluno;

            return dadosAlunoJSON;
        }
   
    }else 
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