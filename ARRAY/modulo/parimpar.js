const calcularPar = function (numero1, numero2)
{
    let numeroIni = parseInt(numero1);
    let numeroTerm = parseInt(numero2);
    let listarPar = [];

        console.log('\nNúmeros Pares')
        for (let i = numeroIni; i <=numeroTerm; i++){
            if(i % 2 == 0){
                listarPar.push(i)
            }
        }
        return listarPar
        
}

const calcularImpar = function (numero1, numero2)
{
    let numeroIni = parseInt(numero1);
    let numeroTerm = parseInt(numero2); 
    let listarImpar = [];

        console.log('\nNúmeros Impares')
        for (let i = numeroIni; i <=numeroTerm; i++){
            if(i % 2 != 0){
                listarImpar.push(i)
        }
    }
    return listarImpar
        
}

const listarParImpar = function (calcularPar,calcularImpar)
{
    let lista = [calcularPar,calcularImpar];

    return lista;
}
 

module.exports = {
    calcularPar,
    calcularImpar,
    listarParImpar
}

