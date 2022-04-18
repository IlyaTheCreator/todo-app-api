const { sequelize } = require("./db/tables/Lists");

sequelize.sync({ force: true }).then(() => {
  console.log("db clear");
});
