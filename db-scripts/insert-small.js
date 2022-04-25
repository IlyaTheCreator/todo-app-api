const { sequelize } = require("./db/database");
const { itemsOptions } = require("./db-mocks/mocks-small");

const queryInterface = sequelize.getQueryInterface();

Promise.all([
  queryInterface.bulkInsert('items', itemsOptions),
]).then(() => {
  console.log("Filled in successfully");
})
