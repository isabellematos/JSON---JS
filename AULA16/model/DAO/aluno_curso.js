/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de recebimento, tratamento e retorno de dados entre a API e a model 
 * Autora: Isabelle
 * Data Criacao: 31/10/2022
 * Versao: 1.0
 * 
 *****************************************************************************************************************/
 const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../../modulo/config.js')

 const insertAlunoCurso = async function (alunoCurso) {
    try {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `insert into tbl_aluno_curso (id_aluno,
                                            id_curso,
                                            matricula,
                                            status_aluno)
                                     values(
                                        '${alunoCurso.id_aluno}',
                                        '${alunoCurso.id_curso}',
                                        '${alunoCurso.matricula}',
                                        '${alunoCurso.status_aluno}'
                                     )`;

// executa o script sql no banco de dados
//executeRawUnsafe permite encaminhar uma variavel contendo um script e nao um script direto
const result = await prisma.$executeRawUnsafe (sql);

// verifica se o script foi executado com sucesso no BD
    if (result) {
        return true;
    }else
        return false;

    } catch (error) {
        return false;
    }
}

//funcao para buscar os dados de curso referente a um aluno
const selectAlunoCurso = async function (idAluno) {
    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();
 
    let sql = `select cast(tbl_curso.id as float) as id_curso, tbl_curso.nome as nome_curso, tbl_curso.sigla as sigla_curso, tbl_curso.carga_horaria,
	                tbl_aluno_curso.matricula, tbl_aluno_curso.status_aluno
	            from tbl_aluno
			        inner join tbl_aluno_curso
				        on tbl_aluno.id = tbl_aluno_curso.id_aluno
			        inner join tbl_curso
				        on tbl_curso.id = tbl_aluno_curso.id_curso
		                    where tbl_aluno.id = ${idAluno};`

        const rsAlunoCurso = await prisma.$queryRawUnsafe(sql)

            if (rsAlunoCurso.length > 0)
                return rsAlunoCurso;
            else 
                return false;

}

module.exports = {
    insertAlunoCurso,
    selectAlunoCurso
}