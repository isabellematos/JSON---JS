/***********************************************************************************************
 *  Objetivo: Aplicar estruturas de repetição (FOR) e ARRAY para realizar analises de par e impar
 *  Data: 25/08/2022
 *  Autora: Isabelle
 *  Versão: 1.0
 **********************************************************************************************/

 console.log('\n###### Analisar e listar numeros pares e impares ######\n');

 const { listarParImpar, calcularPar, calcularImpar } = require('./modulo/parimpar.js');

 var readline = require('readline');

 // instancia do objeto para entrada e saida de dados via promt
 var entradaDados = readline.createInterface({
     input: process.stdin,
     output: process.stdout
 });

 entradaDados.question('Digite o numero que deve iniciar a lista: \n', function(numeroIni){
    let iniNumero = numeroIni;
    
    entradaDados.question('Digite o numero que deve terminar a lista: \n', function(numeroTerm){
        let termNumero = numeroTerm;

        let lista = listarParImpar(calcularPar(iniNumero,termNumero),calcularImpar(iniNumero,termNumero))

        for (let i =0 ; i<lista.length ; i++){
            for (let j = 0 ; j<lista[0].length ; j++){
                console.log(lista[i][j])
            }
            console.log('\n')
        }
        });
    });

