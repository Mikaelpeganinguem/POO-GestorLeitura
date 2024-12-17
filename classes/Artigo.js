const Material = require('./Material.js');  // Verifique o caminho correto para o Material.js
const prompt = require('prompt-sync')();

class Artigo extends Material {
    #volume;
    constructor(titulo, autor, inicio, termino, tipo, volume, paginas) {
        super(titulo, autor, inicio, termino, tipo);
        this.#volume = volume || 0;
        this.paginas = paginas || 0;
    }


    get volume() {
        return this.#volume;
    }

    get numPag() {
        return this.paginas;
    }

    set volume(num) {
        let convert = parseInt(num);
        while (isNaN(convert) || convert < 0) {
            convert = parseInt(prompt("Digite um formato válido para o volume: "));
        }
        this.#volume = convert;
    }

    set numPag(num) {
        let convert = parseInt(num);
        while (isNaN(convert) || convert < 0) {
            convert = parseInt(prompt("Digite um formato válido para o número de páginas: "));
        }
        this.paginas = convert;
    }

    periodico(txt) {
        while (!txt || txt.trim() === "") {
            txt = prompt("Digite um formato válido para o nome do periódico: ");
        }
        this.nome_do_periodico = txt;
    }

    detalhes() {
        return `${super.detalhes()}\nVolume: ${this.#volume}\nPáginas: ${this.paginas}`;
    }
}

module.exports = Artigo;
