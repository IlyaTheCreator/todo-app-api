const { errors } = require("../rules/errors");

class BaseController {
  static types = {};

  constructor(Model) {
    /**
     * Записываем в статическое свойство types объект со значениями и типами данных полей
     */
    Object.keys(Model.getAttributes()).forEach((key) => {
      if (Model.getAttributes()[key].type.key === 'INTEGER') {
        BaseController.types[key.toLowerCase()] = 'number';

        return;
      }

      BaseController.types[key.toLowerCase()] = Model.getAttributes()[key].type.key.toLowerCase();
    });
  }

  /**
   * Method for validating new item data before putting it into db
   */
  validate(obj, types) {
    for (const key in obj) {
      if (!obj[key] || !obj[key].toString().trim()) {
        return errors.field.isNotEmpty(key);
      }

      // Ошибка если тип key не равен типу из таблицы
      if (typeof obj[key] !== types[key.toLowerCase()]) {
        return errors.types.general(key);
      }
    }
  }
}

module.exports = BaseController;
