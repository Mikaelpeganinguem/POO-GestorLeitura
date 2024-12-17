const prompt = require('prompt-sync')();
const Material = require('./classes/Material.js');
const Artigo = require('./classes/Artigo.js');
const Livro = require('./classes/Livro.js');
const Revista = require('./classes/Revista.js');
const { differDate, verifyDate, ifExist } = require('./verifica.js');

var materiais = [];
var Revistas = [];
var Livros = [];
var Artigos = [];

function materialRegistration() {
    let title = prompt("Titulo: ");
    let author = prompt("Autor: ");
    let typeMaterial = prompt("Tipo de Material: ");
    let categorie = prompt("Categoria: ");

    categorie = categorie.toLowerCase();

    let startDate = prompt("Data de início (DD/MM/YYYY): ");
    while (!verifyDate(startDate)) {
        startDate = prompt("Insira uma data válida: ");
    }

    let endDate = prompt("Data de término de leitura (DD/MM/YYYY): ");
    while (!verifyDate(endDate)) {
        endDate = prompt("Insira uma data válida: ");
    }

    differDate(startDate, endDate);

    let newMaterial = new Material(title, author, startDate, endDate);

    if (ifExist(newMaterial)) {
        return "Este material já existe!";
    }

    materialFactory(typeMaterial, title, author, startDate, endDate);

    return ["Mensagem: Objeto adiciondo", { title, author, typeMaterial, startDate, endDate }];
}

function materialFactory(type, titulo, autor, inicio, termino) {
    let material;
    switch (type.toLowerCase()) {
        case 'livro':
            material = new Livro(titulo, autor, inicio, termino, type);

            material.editTipoMaterial = "Livro";
            material.numPaginas = prompt("Número de páginas: ");
            Livros.push(material);
            break;
        case 'artigo':
            material = new Artigo(titulo, autor, inicio, type);

            material.editTipoMaterial = "Artigo";
            let volume = parseInt(prompt("Número do volume: "))
            material.volume = volume;

            let pag = parseInt(prompt("Número de páginas: "))
            material.numPag = pag;

            let periodico = prompt("Nome do Periódico: ")
            material.periodico = periodico;

            Artigos.push(material);
            break;

        case 'revista':
            material = new Revista(titulo, autor, inicio, type);

            material.editTipoMaterial = "Revista";
            material.numEdicao(prompt("Número da edição: "));
            Revistas.push(material);
            break;
        default:
            console.error("Tipo de material inválido!");
            return { message: "Tipo de material inválido!", Success: false };
    }
    materiais.push(material);
    console.log(material.detalhes());
    return true;
}

function editData() {
    let itemUser = parseInt(prompt("Digite o ID do material: "));
    const index = materiais.findIndex(i => i.id === itemUser);

    if (index !== -1) {
        let title = prompt("Título: ");
        let author = prompt("Autor: ");
        let typeMaterial = prompt("Tipo de Material: ").toLowerCase();

        let startDate = prompt("Data de início (DD/MM/YYYY): ");
        while (!verifyDate(startDate)) {
            startDate = prompt("Insira uma data válida: ");
        }

        let endDate = prompt("Data de término de leitura (DD/MM/YYYY): ");
        while (!verifyDate(endDate)) {
            endDate = prompt("Insira uma data válida: ");
        }

        const dateValidation = differDate(startDate, endDate);
        if (!dateValidation.sucess) {
            return dateValidation.menssage;
        }

        materiais[index].titulo = title;
        materiais[index].autor = author;
        materiais[index].tipo_de_material = typeMaterial;
        materiais[index].data_de_inicio = startDate;
        materiais[index].data_de_termino = endDate;

        switch (typeMaterial) {
            case 'livro':
                materiais[index].numPaginas = prompt("Número de páginas: ");
                break;
            case 'artigo':
                materiais[index].volume = prompt("Número do volume: ");
                materiais[index].numPag = prompt("Número de páginas: ");
                materiais[index].periodico = prompt("Nome do Periódico: ");
                break;
            case 'revista':
                materiais[index].numEdicao(prompt("Número da edição: "));
                break;
            default:
                return "Tipo de material inválido!";
        }
        return "Material atualizado com sucesso!";
    } else {
        return "Material não encontrado!";
    }
}

function search() {
    let searchTitle = prompt("Digite 'Título - autor': ");

    const [titulo, autor] = searchTitle.split(" - ");

    let searchUser = materiais.find(item =>
        item.titulo === titulo && item.autor === autor
    );

    if (searchUser === undefined) {
        return `${searchTitle} Não encontrado`;
    }

    return searchUser.detalhes();
}

function remove() {
    let itemUser = parseInt(prompt("Digite o id do material: "));
    let index = materiais.findIndex(i => i.id === itemUser);

    if (index !== -1) {
        materiais.splice(index, 1);
        return "Material removido";
    }
    return "Material não encontrado";
}

module.exports = { materiais, materialRegistration, search, remove, editData };
