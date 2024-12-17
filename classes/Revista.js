const Material = require('./Material.js');
const prompt = require('prompt-sync')();

class Revista extends Material {
    constructor(titulo, autor, data_de_início, numero_da_edicao) {
        super(titulo, autor, data_de_início, "Revista");
        this.numero_da_edicao = numero_da_edicao;
    }

    numEdicao(num){
        while(num < 0){
            num = parseInt(prompt("Digite um formato válido para a edição: "));
        }
        this.numero_da_edicao = num;
    }
    
    detalhes() {
        return `${super.detalhes()}\nNúmero da edição: ${this.numero_da_edicao}`;
    }
}

module.exports = Revista;