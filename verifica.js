const moment = require('moment');
const { materiais, Revistas, Artigos, Livros } = require('./funcionais.js');
function checkMonth(day, month, year) {
  const daysMonth = ['', 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    daysMonth[2] = 29;
  }

  if (day > 0 && day <= daysMonth[month]) {
    return true;
  }
  return false;
}


function isDate(date) {
  return /^(\d{1,2}\/\d{1,2}\/\d{2,4})$/.test(date);
}

function verifyDate(text) {
  if (isDate(text)) {
    const [day, month, year] = text.split('/' || '-' || ' ').map(Number)

    if (checkMonth(day, month, year)) {
      return true;
    }
  }
  return false;
}


function differDate(start, end) {
  const data1 = moment(start, "DD/MM/YYYY");
  const data2 = moment(end, "DD/MM/YYYY");

  const differenceInDays = data2.diff(data1, 'days');
  if (differenceInDays < 0) {
    return { menssage: "A data de início deve ser anterior à data de término.", sucess: false }
  }
  return differenceInDays;
}


function isArray(obj) {
  //return obj && obj.constructor === Array;
  return typeof obj === 'object';
}


function ifExist(obj) {
  if (!isArray(obj)) {
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



function test() {
  console.assert(verifyDate("14/05/2009"), `Erro: 14/05/2009`)
  console.assert(verifyDate("30/02/2023"), `Erro: 30/02/2023`)
  console.assert(verifyDate("32/5/2009"), `Erro: 32/5/2009`)
  console.assert(verifyDate("30/05/2009"), `Erro: 30/05/2009`)
}
//test();
module.exports = { verifyDate, differDate, ifExist, test };
