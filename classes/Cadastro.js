const prompt = require('prompt-sync')();
const Material = require('./Material.js');

class Cadastro {
    constructor() {
        this.materiais = [];
        this.Revistas = [];
        this.Livros = [];
        this.Artigos = [];
    }

    set edimateriais (data){
        this.materiais.push(data);
    }
    set ediRevistas (data){
        this.Revistasmateriais.push(data);
    }
    set ediLivros (data){
        this.Livrosmateriais.push(data);
    }
    set ediArtigos (data){
        this.Artigosmateriais.push(data);
    }

    adicionarMaterial(material) {
        if (this.ifExist(material)) {
            return "Este material já existe";
        }
        this.materiais.push(material);
    
        if (material.tipo_de_Material === 'livro') {
            this.Livros.push(material);
        } else if (material.tipo_de_Material === 'artigo') {
            this.Artigos.push(material);
        } else if (material.tipo_de_Material === 'revista') {
            this.Revistas.push(material);
        }
    }
    


    ifExist(material) {
        return this.materiais.some(item => item.titulo === material.titulo && item.autor === material.autor);
    }


    listarMateriais() {
        return this.materiais.forEach((material) => {
            console.log(material.detalhes());
        });
    }   

    listarPorTipo(tipo){
        switch (tipo.toLowerCase()) {
            case 'livro':
                return this.Livros;
            case 'artigo':
                return this.Artigos;
            case 'revista':
                return this.Revistas;
            default:
                return [];
        }
    }

    pesquisarMaterial(){
        let searchTitle = prompt("Digite  'Título - autor': ");
        const [titulo, autor] = searchTitle.split(" - ");

        let searchResults = this.materiais.filter(item =>
            item.titulo === titulo && item.autor === autor
        );

        if (searchResults.leng === 0) {
            return `${searchTitle} Não encontrado`;
        }

        console.log(`Materiais encontrados: ${searchResults.length}`);
        searchResults.forEach(item => {
            console.log(item.detalhes());
        });
    }

    remover() {
        let itemUser = parseInt(prompt("Digite o id do material: "));
        let index = this.materiais.findIndex(i => i.id === itemUser);

        if (index !== -1) {
            let materialRemov = this.materiais.splice(index, 1)[0];
            this.Artigos = this.Artigos.filter((m) => m.id !== materialRemov.id);
            this.Revistas = this.Revistas.filter((m) => m.id !== materialRemov.id);
            this.Livros = this.Livros.filter((m) => m.id !== materialRemov.id);
            return "Material removido";
        }
        return "Material não encontrado";
    }

    materialLido() {
        let matLidos = this.materiais.filter(i => i.materialLido === true)
        matLidos.forEach(item => {
            console.log(item.detalhes());
        });

        if(matLidos.length === 0){
            console.log("Nenhum material lido.");
        }
    }
}

module.exports = Cadastro;