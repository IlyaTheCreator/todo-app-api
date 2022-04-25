const { sequelize } = require("../db/tables/items");

sequelize.sync({ force: true }).then(() => {
  console.log("db clear");
});
