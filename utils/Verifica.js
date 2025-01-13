const moment = require('moment');
const { materiais, Revistas, Livros, Artigos } = require('./Funcionais.js');

class Verifica {

  static checkMonth(day, month, year) {
    const daysMonth = ['', 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
      daysMonth[2] = 29;
    }

    if (day > 0 && day <= daysMonth[month]) {
      return true;
    }
    return false;
  }


  static isDate(date) {
    return /^(\d{1,2}\/\d{1,2}\/\d{2,4})$/.test(date);
  }

  static verifyDate(text) {
    if (this.isDate(text)) {
      const [day, month, year] = text.split('/' || '-' || ' ').map(Number)

      if (this.checkMonth(day, month, year)) {
        return true;
      }
    }
    return false;
  }


  static differDate(start, end) {
    const data1 = moment(start, "DD/MM/YYYY");
    const data2 = moment(end, "DD/MM/YYYY");

    const differenceInDays = data2.diff(data1, 'days');
    if (differenceInDays < 0) {
      return { mensagem: "A data de início deve ser anterior à data de término.", sucesso: false };
    }
    return { sucesso: true };
  }

  static isArray(obj) {
    return typeof obj === 'object';
  }


  static ifExist(obj) {
    if (!this.isArray(obj)) {
      return "Erro: O objeto fornecido não é um array.";
    }

    const listClass = [materiais, Livros, Revistas, Artigos];

    return listClass.some(collection => collection && collection.length > 0 &&
      collection.some(item =>
        item.titulo === obj.titulo &&
        item.autor === obj.autor &&
        item.data_de_inicio === obj.data_de_inicio &&
        item.data_de_termino === obj.data_de_termino
      )
    );
  }

}


function test() {
  console.log(Verifica.differDate("22/05/2020", "21/08/2018"));
  console.log(Verifica.differDate("21/08/2018", "22/05/2020"));
}
// test();
module.exports = Verifica;
