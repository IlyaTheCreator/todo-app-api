
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
}

module.exports = BaseController;
