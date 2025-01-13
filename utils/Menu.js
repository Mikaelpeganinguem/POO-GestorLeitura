const prompt = require('prompt-sync')();
const { Funcionais, materiais } = require('./Funcionais.js');

class Menu {
    static createMenu() {

        console.clear();
        console.log("=".repeat(50));
        console.log("📚 Bem-vindo ao seu Gestor de Leituras 📚");
        console.log("=".repeat(50));
    
        let escolha = 0;
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
            console.log(this.projeto(escolha));
        }
    }

    
    static projeto(escolha) {
        console.log("=".repeat(50)); // Linha de separação
        switch (escolha) {
            case 1:
                console.log("📥 Adicionando material...");
                console.log(Funcionais.materialRegistration());
                break;
            case 2:
                console.log("📋 Verificando materiais...");
                if (materiais.length === 0) {
                    console.log("❌ Nada cadastrado!");
                } else {
                    console.log("📚 Lista de Materiais:");
                    materiais.forEach(i => {
                        console.log(i.detalhes());
                        console.log("");
                    });
                }
                break;
            case 3:
                console.log("🗑️ Excluindo material...");
                console.log(Funcionais.remove());
                break;
            case 4:
                console.log(Funcionais.materialLido());
                break;
            case 5:
                console.log("🔍 Pesquisando material...");
                console.log(Funcionais.search());
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