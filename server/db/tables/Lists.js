const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Lists extends Model { };

Lists.init({
  name: {
    type: DataTypes.STRING,
    unique: true, // Отвечает за уникальность имени списка
    allowNull: false,
    validate: {
      isString(value) {
        if (typeof value !== 'string') {
          throw new Error(errors.types.string.message);
        }
      },
    }
  },
},
  {
    sequelize,
    modelName: 'lists',
    timestamps: false,
  }
);

module.exports = Lists;