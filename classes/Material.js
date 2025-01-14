const Verifica = require('../utils/Verifica');

class Material {
    static #id = 0;

    constructor(titulo, autor, inicio, termino, tipo) {
        Material.#id += 1;
        this.id = Material.#id;
        this.titulo = titulo;
        this.autor = autor;
        this.data_de_início = inicio;
        this.data_de_termino = termino;
        this.materialLido = false;
        this.tipo_de_material = tipo || "Indefinido";
    }


    get TipoMaterial() {
        return this.tipo_de_material;
    }
    get Fim() {
        return this.data_de_termino;
    }
    get Inicio() {
        return this.data_de_início;
    }
    get Autor() {
        return this.autor;
    }
    get Titulo() {
        return this.titulo;
    }


    set editTitulo(novo) {
        this.titulo = novo;
    }
    set editAutor(novo) {
        this.autor = novo;
    }
    set editTipoMaterial(novoTipo) {
        this.tipo_de_material = novoTipo;
    }
    set editInicio(data) {
        if (Verifica.verifyDate(data)) {
            this.data_de_início = data;
            return `Data atualizada para: ${data}`;
        }
        return "Formato de data não aceito";
    }
    set editFim(data) {
        if (Verifica.verifyDate(data)) {
            this.data_de_termino = data;
            return `Data atualizada para: ${data}`;
        }
        return "Formato de data não aceito";
    }



    set statusLeitura(resp) {
        if (resp === "s") {
            this.materialLido = true;
        }
    }

    detalhes() {
        const status = this.materialLido ? "Sim" : "Não";
        return `\nId Material: ${this.id}\nAutor: ${this.autor}\nTítulo: ${this.titulo}\nData de início: ${this.data_de_início}\nTipo: ${this.tipo_de_material}\nLido: ${status}`;
    }
}
module.exports = Material;
