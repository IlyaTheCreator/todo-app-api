const { Model, DataTypes } = require('sequelize');
const { errors } = require('../../rules/errors');
const sequelize = require('../database');

class Items extends Model { };

Items.init(
  {
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
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    modelName: 'items',
    timestamps: false,
  }
);

module.exports = Items;
