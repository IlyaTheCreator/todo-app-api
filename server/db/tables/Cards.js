const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

const Lists = require('./Lists');

class Cards extends Model { };

Cards.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  listId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},
  {
    sequelize,
    modelName: 'cards',
    timestamps: false,
  }
);


Lists.hasMany(Cards, {
  foreignKey: {
    name: 'listId',
  },
  onDelete: 'CASCADE',
  hooks: true,
});
Cards.belongsTo(Lists);

module.exports = Cards;