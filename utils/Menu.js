const prompt = require('prompt-sync')();
const Funcionais = require('./Funcionais.js');
const Cadastro = require('../classes/Cadastro.js');

class Menu {
    static createMenu() {
        console.clear();
        console.log("=".repeat(50));
        console.log("📚 Bem-vindo ao seu Gestor de Leituras 📚");
        console.log("=".repeat(50));

        let escolha = 0;
        const cadastro = new Cadastro();

        while (escolha !== 6) {
            console.log(`
    ${"-".repeat(50)}
      1️⃣  ➡️  Adicionar Material
      2️⃣  ➡️  Ver Materiais
      3️⃣  ➡️  Excluir Materiais
      4️⃣  ➡️  Materiais Lidos
      5️⃣  ➡️  Pesquisar Materiais
      6️⃣  ➡️  Encerrar
    ${"-".repeat(50)}
        `);

            escolha = parseInt(prompt("👉 Escolha uma das opções acima: "));
            this.projeto(escolha, cadastro); // Passe o cadastro para a função projeto
        }
    }

    static projeto(escolha, cadastro) { 
        console.log("=".repeat(50)); 
        switch (escolha) {
            case 1:
                console.log("📥 Adicionando material...");
                console.log(Funcionais.materialRegistration(cadastro));
                break;
            case 2:
                console.log("📋 Verificando materiais...");
                if (cadastro.listarMateriais()) {
                    console.log("❌ Nada cadastrado!");
                } else {
                    console.log("📚 Lista de Materiais:");
                    console.log(cadastro.listarMateriais());
                }
                break;
            case 3:
                console.log("🗑️ Excluindo material...");
                console.log(cadastro.remover());
                break;
            case 4:
                console.log(cadastro.materialLido());
                break;
            case 5:
                console.log("🔍 Pesquisando material...");
                console.log(cadastro.pesquisarMaterial());
                break;
            case 6:
                console.log("🚪 Programa finalizado!");
                console.log(`
    --- FEITO POR: ---
    - Mikael Carlos
    - Misia Taís
    - Mayara Rita
                `);
                break;
            default:
                console.log("❌ Opção não encontrada. Tente novamente.");
                break;
        }
        console.log("=".repeat(50));
    }
}

module.exports = Menu;