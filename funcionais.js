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
        let title = prompt("Mudar título? (N/n): ").toLowerCase();
        if (title === "n" || title.trim() === "") {
            title = materiais[index].titulo;
        }

        let author = prompt("Mudar autor? (N/n): ").toLowerCase();
        if (author === "n" || author.trim() === "") {
            author = materiais[index].autor;
        }

        let typeMaterial = prompt("Mudar o Tipo de Material para: (N/n): ").toLowerCase();
        if (typeMaterial === "n" || typeMaterial.trim() === "") {
            typeMaterial = materiais[index].editTipoMaterial;
        }

        let startDate = prompt("Mudar data de início? (DD/MM/YYYY) (N/n): ");
        if (startDate.toLowerCase() === "n" || startDate.trim() === "") {
            startDate = materiais[index].editInicio;
        } else {
            while (!verifyDate(startDate)) {
                startDate = prompt("Insira uma data válida: ");
            }
        }

        let endDate = prompt("Mudar data de término? (DD/MM/YYYY) (N/n): ");
        if (endDate.toLowerCase() === "n" || endDate.trim() === "") {
            endDate = materiais[index].editFim;
        } else {
            while (!verifyDate(endDate)) {
                endDate = prompt("Insira uma data válida: ");
            }
        }

        materiais[index].editTitulo = title;
        materiais[index].editAutor = author;
        materiais[index].editTipoMaterial = typeMaterial;
        materiais[index].editInicio = startDate;
        materiais[index].editFim = endDate;

        switch (typeMaterial) {
            case 'livro':
                let pag = prompt("Editar Número de páginas? (N/n): ").toLowerCase();
                if (pag === "n" || pag.trim() === "") {
                    pag = materiais[index].numPaginas;
                } else {
                    materiais[index].numPaginas = parseInt(pag);
                }
                break;

            case 'artigo':
                let volume = prompt("Editar Número do volume? (N/n): ").toLowerCase();
                if (volume === "n" || volume.trim() === "") {
                    volume = materiais[index].volume;
                } else {
                    materiais[index].volume = parseInt(volume);
                }

                let pagi = prompt("Editar Número de páginas? (N/n): ").toLowerCase();
                if (pagi === "n" || pagi.trim() === "") {
                    pagi = materiais[index].numPag;
                } else {
                    materiais[index].numPag = parseInt(pagi);
                }

                let peri = prompt("Editar Nome do Periódico? (N/n): ").toLowerCase();
                if (peri === "n" || peri.trim() === "") {
                    peri = materiais[index].periodico;
                } else {
                    materiais[index].periodico = peri;
                }
                break;

            case 'revista':
                let numEdic = prompt("Editar Número da edição? (N/n): ").toLowerCase();
                if (numEdic === "n" || numEdic.trim() === "") {
                    numEdic = materiais[index].numEdicao;
                } else {
                    materiais[index].numEdicao = parseInt(numEdic);
                }
                break;

            default:
                return "Tipo de material inválido!";
        }
        return "✅ Material atualizado com sucesso!";
    } else {
        return "❌ Material não encontrado!";
    }
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

module.exports = { materiais, materialRegistration, search, remove, editData, materialLido };
