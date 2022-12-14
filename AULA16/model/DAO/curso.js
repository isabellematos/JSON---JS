/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados com o banco de dados 
 *      (insert, update, delete e select)
 * Autora: Isabelle
 * Data Criacao: 27/10/2022
 * Versao: 1.0
 *  
 *****************************************************************************************************************/

//Funcao para inserir um novo registro no BD
const insertCurso = async function (curso) {
    try {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `insert into tbl_curso (nome,
                                      carga_horaria, 
                                      icone, 
                                      sigla)
                                     values(
                                        '${curso.nome}',
                                        '${curso.carga_horaria}',
                                        '${curso.icone}',
                                        '${curso.sigla}'
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

//Funcao para atualizar um registro no BD
const updateCurso = async function (curso) {

    try {

        //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client')
    
        //instancia da classe PrismaClient
        const prisma = new PrismaClient();
    
        let sql = `update tbl_curso set
                                        nome  = '${curso.nome}',
                                        carga_horaria = '${curso.carga_horaria}',
                                        icone  = '${curso.icone}',
                                        sigla = '${curso.sigla}' where id = ${curso.id}
                                         `;
     
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

//Funcao para excluir um registro no BD
const deleteCurso = async function (id) {

    try {

        //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client')
    
        //instancia da classe PrismaClient
        const prisma = new PrismaClient();
    
        let sql = `delete from tbl_curso
                                where id = '${id}'
                                 `;
     
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

//Funcao para retornar todos os registros no BD
const selectAllCursos = async function () {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto de tipo RecordSet (rsCursos) para receber os dados de BD atraves do script SQL (select)
    const rsCursos = await prisma.$queryRaw `select cast(id as float) as id, nome, carga_horaria, icone, sigla from tbl_curso order by id desc`;

    if (rsCursos.length > 0)
        return rsCursos;
    else 
        return false;
}

//funcao para retornar apenas o registro baseado no ID
const  selectCursoById = async function (id) {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id,
                                        nome,
                                         carga_horaria,
                                          icone,
                                           sigla
                                             from tbl_curso
                                              where id = ${id}`;

    //Criamos um objeto de tipo RecordSet (rsCurso) para receber os dados de BD atraves do script SQL (select)
    const rsCurso = await prisma.$queryRawUnsafe(sql)

    if (rsCurso.length > 0)
        return rsCurso;
    else 
        return false;
}

module.exports = {
    selectAllCursos,
    insertCurso,
    updateCurso,
    deleteCurso,
    selectCursoById
}
