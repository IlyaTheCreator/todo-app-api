const { Model, DataTypes } = require('sequelize');
const { errors } = require('../../rules/errors');
const sequelize = require('../database');

class Cards extends Model { };

Cards.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error(errors.types.string.message);
        }
      }
    }
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  listId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isNumber(value) {
        if (typeof value !== 'number') {
          throw new Error(errors.types.number.message);
        }
      }
    }
  }
},
  {
    sequelize,
    modelName: 'cards',
    timestamps: false,
  }
);

module.exports = Cards;
