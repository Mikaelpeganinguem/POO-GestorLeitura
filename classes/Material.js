const { verifyDate } = require('../verifica.js');

class Material {
    static #id = 0;

    constructor(titulo, autor, inicio, termino, tipo) {
        Material.#id += 1;
        this.id = Material.#id;
        this.titulo = titulo;
        this.autor = autor;
        this.data_de_início = inicio;
        this.data_de_termino = termino;
        this.fim_da_leitura = false;
        this.tipo_de_material = tipo || "Indefinido";
    }


    get editTipoMaterial() {
        return this.tipo_de_material;
    }
    get editFim() {
        return this.data_de_termino;
    }
    get editInicio() {
        return this.data_de_início;
    }
    get eidtAutor(){
        return this.autor;
    }
    get editTitulo(){
        return this.titulo;
    }


    set editTitulo(novo){
        this.titulo = novo;
    }
    set editAutor(novo){
        this.autor = novo;
    }
    set editTipoMaterial(novoTipo) {
        this.tipo_de_material = novoTipo;
    }
    set editInicio(data) {
        if (verifyDate(data)) {
            this.data_de_início = data;
            return `Data atualizada para: ${data}`;
        }
        return "Formato de data não aceito";
    }
    set editFim(data) {
        if (verifyDate(data)) {
            this.data_de_termino = data;
            return `Data atualizada para: ${data}`;
        }
        return "Formato de data não aceito";
    }

    
    statusLeitura() {
        if (!this.fim_da_leitura) {
            this.fim_da_leitura = true;
        }
        this.fim_da_leitura = false;
    }

    detalhes() {
        const status = this.fim_da_leitura ? "Sim" : "Não";
        return `\nId Material: ${this.id}\nAutor: ${this.autor}\nTítulo: ${this.titulo}\nData de início: ${this.data_de_início}\nTipo: ${this.tipo_de_material}\nLido: ${status}`;
    }
}

module.exports = Material;  // Certifique-se de que esta exportação está presente
