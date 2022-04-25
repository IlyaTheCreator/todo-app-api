const { sequelize } = require("./db/database");

sequelize.sync({ force: true }).then(() => {
  console.log("db clear");
});
