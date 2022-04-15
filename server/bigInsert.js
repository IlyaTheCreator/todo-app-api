const { sequelize } = require("./db/tables/Lists");
const { listOptions, cardsOptions } = require("./bigMocks");


const queryInterface = sequelize.getQueryInterface();

Promise.all([
  queryInterface.bulkInsert('lists', listOptions),
  queryInterface.bulkInsert('cards', cardsOptions)
]).then(() => {
  console.log("Успешно заполнено");
})



module.exports = { listOptions };