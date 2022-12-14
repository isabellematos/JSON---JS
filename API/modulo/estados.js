/***********************************************************************************************************
* Objetivo: Obter uma lista de estados
* Data: 29/08/2022
* Autora: Isabelle
************************************************************************************************************/

// simulando uma API
var estados = [
    {
        sigla : 'SP',
        nome : 'Sao Paulo'
    },
    {
        sigla : 'AC',
        nome : 'Acre'
    },
    {
        sigla : 'RJ',
        nome : 'Rio de Janeiro'
    },
    {
        sigla : 'BA',
        nome : 'Bahia'
    },
    {
        sigla : 'CE',
        nome : 'Ceara'
    },
    {
        sigla : 'MG',
        nome : 'Minas Gerais'
    },
    {
        sigla : 'GO',
        nome : 'Goias'
    },
    {
        sigla : 'SC',
        nome : 'Santa Catarina'
    }


];

// Retorna todos os estados pela sigla
const getEstados = function(){
    let listaEstados = [];
    erro = true

    estados.forEach(item => {
        listaEstados.push(item.sigla)
        erro = false;
    });

    if (erro)
        return false;
    else 
        //Converte um array para JSON
        return listaEstados;
};

// Retorna os dados de um estado tendo como base a sigla
const getEstado = function(siglaEstado){
    // converte a chegada em letra maiuscula
    let sigla = siglaEstado;
    //cria um objeto do tipo JSON
    let estado = {};
    let erro = true;
    
    if(typeof(sigla) != 'undefined')
    {
        if(sigla != '' && sigla.length == 2)
        {
            estados.forEach (item => {
        // localiza um item no array
            if(item.sigla.indexOf(sigla.toUpperCase()) == 0)
            {
            // Criamos as chavez uf e descricao para enviar pelo JSON
                estado.uf = item.sigla,
                estado.descricao = item.nome
                erro = false;
            }

        });

    if(erro)
        return false;
    else
        return estado
        };
    };
};

module.exports = {
    getEstados,
    getEstado
};