/*****************************************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulacao de dados com o banco de dados 
 *      (insert, update, delete e select)
 * Autor: Isabelle
 * Data Criacao: 06/10/2022
 * Versao: 1.0
 *  
 *****************************************************************************************************************/
//Funcao para inserir um novo registro no BD
const insertAluno = async function (aluno) {
    try {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `insert into tbl_aluno (nome,
                                     foto, 
                                     rg, 
                                     cpf, 
                                     email, 
                                     data_nascimento, 
                                     telefone, 
                                     celular, 
                                     sexo)
                                     values(
                                        '${aluno.nome}',
                                        '${aluno.foto}',
                                        '${aluno.rg}',
                                        '${aluno.cpf}',
                                        '${aluno.email}',
                                        '${aluno.data_nascimento}',
                                        '${aluno.telefone}',
                                        '${aluno.celular}',
                                        '${aluno.sexo}'
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
const updateAluno = async function (aluno) {

    try {

        //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client')
    
        //instancia da classe PrismaClient
        const prisma = new PrismaClient();
    
        let sql = `update tbl_aluno set
                                        nome  = '${aluno.nome}',
                                        foto = '${aluno.foto}',
                                        rg  = '${aluno.rg}',
                                        cpf = '${aluno.cpf}',
                                        email ='${aluno.email}',
                                        data_nascimento =  '${aluno.data_nascimento}',
                                        telefone = '${aluno.telefone}',
                                        celular =  '${aluno.celular}',
                                        sexo ='${aluno.sexo}' where id = ${aluno.id}
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
const deleteAluno = async function (id) {

    try {

        //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
        const { PrismaClient } = require('@prisma/client')
    
        //instancia da classe PrismaClient
        const prisma = new PrismaClient();
    
        let sql = `delete from tbl_aluno
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
const selectAllAlunos = async function () {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    //Criamos um objeto de tipo RecordSet (rsAlunos) para receber os dados de BD atraves do script SQL (select)
    const rsAlunos = await prisma.$queryRaw `select cast(id as float) as id, nome, foto, sexo, rg, cpf, email, telefone, celular, data_nascimento from tbl_aluno order by id desc`;

    if (rsAlunos.length > 0)
        return rsAlunos;
    else 
        return false;
}

//funcao para retornar apenas o registro baseado no ID
const  selectAlunoById = async function (id) {

    //Import da classe prismaClient, que é responsavel pelas interacoes com o BD
    const { PrismaClient } = require('@prisma/client')

    //instancia da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id,
                                        nome,
                                         foto,
                                          sexo,
                                           rg,
                                            cpf,
                                             email,
                                              telefone,
                                               celular,
                                                data_nascimento
                                                 from tbl_aluno
                                                  where id = ${id}`;

    //Criamos um objeto de tipo RecordSet (rsAlunos) para receber os dados de BD atraves do script SQL (select)
    const rsAluno = await prisma.$queryRawUnsafe(sql)

    if (rsAluno.length > 0)
        return rsAluno;
    else 
        return false;
}

module.exports = {
    selectAllAlunos,
    insertAluno,
    updateAluno,
    deleteAluno,
    selectAlunoById
}