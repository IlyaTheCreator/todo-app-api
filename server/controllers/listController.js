const Lists = require('../db/tables/Lists');
const Cards = require('../db/tables/Cards');
const BaseController = require("./baseController");
const { errors, messages } = require('../rules/errors');


class ListController extends BaseController {
  constructor() {
    super(Lists);
  }

  /**
   * POST запрос. Добавление нового списка, данные из тела запроса
   * ex. http://localhost:8080/api/lists
   */
  addList = async (req, res) => {
    try {
      const { name } = req.body;
      const list = { name };

      /**
       * Проверка: было ли вообще получено поле name,
       * а если получено, то не является ли пустой строкой.
       */
      const listError = this.validate(list, ListController.types);

      if (listError) {
        res.status(409).json({ data: listError });

        return;
      }

      const data = await Lists.create(list);
      res.status(201).json({
        data: {
          id: data.id,
          ...messages.list.added
        }
      });
    } catch (e) {
      if (e.toString().toLowerCase().includes('unique')) {
        res.status(409).json({ data: errors.lists.uniqueName });

        return;
      }

      res.status(500).json({ data: e })
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
        res.json({ data: messages.list.noData });

        return;
      }
      res.json({ data: lists });
    } catch (e) {
      res.status(500).json({ data: e });
    }
  }

  /**
   * GET запрос. Получение списка по id
   * ex. http://localhost:8080/api/lists/:id
   */
  async getList(req, res) {
    try {
      const reqId = req.params.id;
      const list = await Lists.findOne({ where: { id: reqId } });

      if (!list) {
        res.status(409).json({ data: errors.lists.notDefined });

        return;
      }

      res.status(200).json({ data: list });
    } catch (e) {
      res.status(500).json({ data: e });
    }
  }

  /**
   * DELETE запрос. Удаление списка
   * ex. http://localhost:8080/api/lists/:id
   */
  async deleteList(req, res) {
    try {
      const reqId = req.params.id;
      const list = await Lists.findOne({ where: { id: reqId } });

      if (list) {
        await list.destroy();
        res.status(200).json({
          data: {
            id: list.id,
            ...messages.list.deleted
          }
        });

        return;
      }

      res.status(409).json({ data: errors.lists.notDefined });
    } catch (e) {
      res.status(500).json({ data: e });
    }
  }

  /**
   * PUT запрос. Обновление имени для списка
   * ex. http://localhost:8080/api/lists/:id
   * Имя принимает из тела запроса
   */
  setNameList = async (req, res) => {
    try {
      const reqId = req.params.id;
      const { name } = req.body;
      const list = await Lists.findOne({ where: { id: reqId } });

      if (!list) {
        res.status(409).json({ data: errors.lists.notDefined });

        return;
      }

      const listError = this.validate({ name }, ListController.types);

      if (listError) {
        res.status(409).json({ data: listError });

        return;
      }

      list.name = name;
      await list.save();

      res.status(200).json({
        data: {
          id: list.id,
          ...messages.list.updated
        }
      });
    } catch (e) {
      res.status(500).json({ data: e });
    }
  }

  async allDelete(req, res) {
    try {
      Lists.destroy({ truncate: true });

      res.json({ data: messages.list.deletedAll });
    } catch (e) {
      res.status(500).json({ data: e });
    }
  }
}

module.exports = new ListController();