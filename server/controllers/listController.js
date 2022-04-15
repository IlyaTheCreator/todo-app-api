const Lists = require('../db/tables/Lists');
const BaseController = require("./baseController");
const { errors } = require('../rules/errors');

class ListController extends BaseController {
  constructor() {
    super(Lists);
  }

  /**
   * POST запрос. Добавление нового списка, данные из тела запроса
   * ex. http://localhost:8080/api/list
   */
  async addList(req, res) {
    try {
      const { name } = req.body;
      const list = { name };

      const arr = [];

      /**
       * Проверка: было ли вообще получено поле name,
       * а если получено, то не является ли пустой строкой.
       */
      if (!name || !name.toString().trim()) {
        arr.push(errors.field.isNotEmpty('name'));
      }

      //Проверка типов
      if (typeof name !== ListController.types.name) {
        arr.push(errors.types.general('name'));
      }
      if (arr.length) {
        res.status(400).json(arr);

        return;
      }

      await Lists.create(list);
      res.json('List Added');
    } catch (e) {
      if (e.toString().toLowerCase().includes('unique')) {
        res.json(errors.lists.uniqueName);

        return;
      }

      console.log(e);
      res.json(e)
    }
  }

  /**
   * GET запрос. Получение всех списков
   * ex. http://localhost:8080/api/lists
  */
  async getLists(req, res) {
    try {
      const lists = await Lists.findAll();

      if (!lists) {
        res.json('There are no lists');

        return;
      }
      res.status(200).json({ date: lists });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getList(req, res) {
    try {
      const reqId = req.params.id;
      const list = await Lists.findOne({ where: { id: reqId } });

      if (!list) {
        res.json(errors.lists.notDefined);

        return;
      }

      res.json({ data: list });
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  }

  /**
   * DELETE запрос. Удаление карточки
   * ex. http://localhost:8080/api/list/<id>
   */
  async deleteList(req, res) {
    try {
      const reqId = req.params.id;
      const list = await Lists.findOne({ where: { id: reqId } });

      if (list) {
        await list.destroy();
        res.json(`List with Id = ${reqId} is deleted`);

        return;
      }

      res.json(errors.lists.notDefined);
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  }

  /**
   * PUT запрос. Обновление имени для списка
   * ex. http://localhost:8080/api/list/<id>
   * Имя принимает из тела запроса
   */
  async setNameList(req, res) {
    try {
      const reqId = req.params.id;
      const { name } = req.body;
      const list = await Lists.findOne({ where: { id: reqId } });

      if (!list) {
        res.json(errors.lists.notDefined);

        return;
      }

      // Аналогично в методе Addlist
      if (!name || !name.toString().trim()) {
        res.json(errors.field.isNotEmpty('name'));

        return;
      }

      // Аналогично в методе Addlist
      if (typeof name !== ListController.types.name) {
        res.json(errors.types.general('name'));

        return;
      }

      list.name = name;
      await list.save();

      res.json('Name updated');
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  }
}

module.exports = new ListController();