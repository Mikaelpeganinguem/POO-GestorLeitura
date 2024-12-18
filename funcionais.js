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
    if (leitura === "s") {
        newMaterial.statusLeitura(leitura);
    }
    //return ["Mensagem: Objeto adiciondo", { title, author, typeMaterial, startDate, endDate }];
    return "Material adicionado";
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



function search() {
    let searchTitle = prompt("Digite  'Título - autor': ");
    const [titulo, autor] = searchTitle.split(" - ");

    let searchResults = materiais.filter(item =>
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

function remove() {
    let itemUser = parseInt(prompt("Digite o id do material: "));
    let index = materiais.findIndex(i => i.id === itemUser);

    if (index !== -1) {
        materiais.splice(index, 1);
        return "Material removido";
    }
    return "Material não encontrado";
}


function materialLido() {
    let matLidos = materiais.filter(i => i.lido === "Sim")
    matLidos.forEach(item => {
        console.log(item.detalhes())
    });
}

module.exports = { materiais, materialRegistration, search, remove, materialLido };
