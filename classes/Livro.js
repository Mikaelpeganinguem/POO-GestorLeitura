const prompt = require('prompt-sync')();
const Material = require('./Material.js');

class Livro extends Material {
    constructor(titulo, autor, data_de_inicio, tipo_de_material, paginas) {
        super(titulo, autor, data_de_inicio, tipo_de_material);
        this.paginas = paginas;
    }

    get numPaginas(){
        return this.paginas;
    }

    set numPaginas(pag) {
        let convert = parseInt(pag)
        while (convert < 0) {
            convert = parseInt(prompt("Digite um número válido: "));
        }
        this.numero_de_paginas = convert;
    }

    detalhes() {
        return `${super.detalhes()}\nNúmero de páginas: ${this.numero_de_paginas}`;
    }
}

module.exports = Livro;