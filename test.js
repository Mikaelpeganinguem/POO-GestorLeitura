const Material = require('./classes/Material');
const Artigo = require('./classes/Artigo.js');
const Revista = require('./classes/Revista.js');
const Livro = require('./classes/Livro.js');
const { materiais, Revistas, Livros, Artigos, test } = require('./funcionais.js');


const mat1 = new Material("Livro A", "João", "01/01/2023", "10/01/2023", "Livro");
const mat2 = new Material("Revista B", "Maria", "05/01/2023", "20/01/2023", "Revista");
const mat3 = new Material("Artigo C", "José", "10/01/2023", "15/01/2023", "Artigo");

console.log(mat1.detalhes());
console.log("");
console.log(Livros.detalhes())
console.log("")

console.log(mat2.detalhes());
console.log("");
console.log(Revistas.detalhes());
console.log("");

console.log(mat3.detalhes());
console.log("");
console.log(Artigos.detalhes());
console.log("")

test();
console.log("");
