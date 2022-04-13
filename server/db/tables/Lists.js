const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Lists extends Model { };

Lists.init({
  name: {
    type: DataTypes.STRING,
    unique: true, // Отвечает за уникальность имени списка
    allowNull: false,
  },
},
  {
    sequelize,
    modelName: 'lists',
    timestamps: false,
  }
);

module.exports = Lists;