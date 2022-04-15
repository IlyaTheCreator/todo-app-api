const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite',
  dialectOptions: {
    multipleStatements: true
  },
});

module.exports = sequelize;