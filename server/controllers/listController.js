const Lists = require('../db/tables/Lists');
const { errors } = require('../rules/errors');

class ListController {
  /**
   * POST запрос. Добавление нового списка, данные из тела запроса
   * ex. http://localhost:8080/api/list
   */
  async addList(req, res) {
    try {
      const list = {
        name: req.body.name || null,
      };

      if (!list.name) {
        res.json('Name not specified');

        return;
      }

      await Lists.create(list);
      res.json('List Added');
    } catch (e) {
      if (e.toString().toLowerCase().includes('unique')) {
        res.json(errors.lists.uniqueName);

        return;
      }

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
      res.json(lists);
    } catch (e) {
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

      await list.destroy();

      res.json(`List with Id = ${reqId} is deleted`);
    } catch (e) {
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
      const list = await Lists.findOne({ where: { id: reqId } });

      if (!list) {
        res.json('List is not defined');

        return;
      }
      if (!req.body.name) {
        res.json('Name not specified');

        return;
      }

      list.name = req.body.name;
      await list.save();

      res.json('Name updated');
    } catch (e) {
      res.json(e);
    }
  }
}

module.exports = new ListController();