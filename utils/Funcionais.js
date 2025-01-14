const prompt = require('prompt-sync')();
const Cadastro = require('../classes/Cadastro.js');
const Material = require('../classes/Material.js');
const Artigo = require('../classes/Artigo.js');
const Livro = require('../classes/Livro.js');
const Revista = require('../classes/Revista.js');
const Verifica = require('./Verifica.js');


class Funcionais {

    static materialRegistration(cadastro) {
        let title = prompt("Titulo: ");
        while (title === "") {
            title = prompt("Insira um título: ");
        }

        let author = prompt("Autor: ");
        while (author === "") {
            author = prompt("Insira o nome do Autor: ");
        }

        let typeMaterial = prompt("Tipo de Material (Artigo/Livro/Revista): ").toLowerCase();
        while (!["livro", "revista", "artigo"].includes(typeMaterial)) {
            typeMaterial = prompt("Digite um Material válido: ");
        }

        let categorie = prompt("Categoria: ");
        categorie = categorie.toLowerCase();

        let leitura = prompt("Você ja leu? (S/N): ").toLowerCase();
        while (leitura === "" || !["s", "n"].includes(leitura)) {
            leitura = prompt("Informe se já leu: ");
        }


        let startDate = prompt("Data de início (DD/MM/YYYY): ");
        while (!Verifica.verifyDate(startDate)) {
            startDate = prompt("Insira uma data válida: ");
        }

        let endDate = prompt("Data de término de leitura (DD/MM/YYYY): ");
        while (!Verifica.verifyDate(endDate)) {
            endDate = prompt("Insira uma data válida: ");
        }


        let diffResult = Verifica.differDate(startDate, endDate);
        if (!diffResult.sucesso) {
            console.log(diffResult.mensagem);
            return diffResult.mensagem;
        }

        let newMaterial = this.materialFactory(typeMaterial, title, author, startDate, endDate);
        // let newMaterial = new Material(title, author, startDate, endDate);

        if (leitura === "s" && newMaterial) {
            newMaterial.statusLeitura = leitura;
        }

        cadastro.adicionarMaterial(newMaterial); 
        

        console.log("Material adicionado com sucesso:");
        console.log(newMaterial.detalhes());
        return "Material adicionado";
    }

    static materialFactory(type, titulo, autor, inicio, termino) {
        let material;
        switch (type.toLowerCase()) {
            case 'livro':
                material = new Livro(titulo, autor, inicio, termino, type);
                material.editTipoMaterial = "Livro";
                material.numPaginas = prompt("Número de páginas: ");

                // cadastro.materiais = material;
//                 cadastro.Livros = material;
                return material || null;

            case 'artigo':
                material = new Artigo(titulo, autor, inicio, type);

                material.editTipoMaterial = "Artigo";
                let volume = parseInt(prompt("Número do volume: "))
                material.volume = volume;

                let pag = parseInt(prompt("Número de páginas: "))
                material.numPag = pag;

                let periodico = prompt("Nome do Periódico: ")
                material.periodico = periodico;

                // cadastro.Artigos = material;
                // cadastro.materiais = material;

                return material || null;

            case 'revista':
                material = new Revista(titulo, autor, inicio, type);

                material.editTipoMaterial = "Revista";
                material.numEdicao(prompt("Número da edição: "));
                // cadastro.Revistas = material;
                // cadastro.materiais = material;

                return material || null;

            default:
                console.error("Tipo de material inválido!");
                return { message: "Tipo de material inválido!", Success: false };
        }
        return material;
    }
}

module.exports = Funcionais;
