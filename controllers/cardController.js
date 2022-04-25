const { Op } = require("sequelize");

const Items = require("../db/tables/Items");
const BaseController = require("./baseController");
const { errors } = require("../rules/errors");
const { messages } = require("../rules/messages");

class ItemsController extends BaseController {
  constructor() {
    super(Items);
  }
  
  /**
   * POST запрос. Добавление карточки. Данные принимаются из тела запрсоа
   * ex. http://localhost:8080/api/items
   */
  addItem = async (req, res) => {
    try {
      const { name, parentId } = req.body;

      if (parentId) {
        const parentItem = await Items.findOne({ where: { id: parentId } });

        if (!parentItem) {
          res.status(400).json(errors.items.noParent);

          return;
        }
      }

      const item = parentId ? { name, parentId } : { name };
      const itemError = this.validate(item, ItemsController.types);

      if (itemError) {
        res.status(400).json(itemError);

        return;
      }

      const data = await Items.create(item);

      res.status(201).json({
        id: data.id,
        ...messages.items.added
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * GET запрос. Получение всех карточек
   * ex. http://localhost:8080/api/items
   */
  async getItems(req, res) {
    try {
      const items = await Items.findAll();

      if (!items) {
        res.json(messages.items.noData);
      }

      res.json(items);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * GET запрос. Получение карточки по id
   * ex. http://localhost:8080/api/items/:id
   */
  async getItem(req, res) {
    try {
      const reqId = req.params.id;
      const item = await Items.findOne({ where: { id: reqId } });

      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      const itemChildren = await Items.findAll({ where: { parentId: item.id } });
      item.dataValues.children = itemChildren;

      res.json(item);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * PUT запрос. Обновление имени для карточки
   * ex. http://localhost:8080/api/items/:id
   * Имя принимает из тела запроса
   */
  setNameItem = async (req, res) => {
    try {
      const reqId = req.params.id;
      const item = await Items.findOne({ where: { id: reqId } });

      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      const { name } = req.body;
      const itemError = this.validate({ name }, ItemsController.types);

      if (itemError) {
        res.status(400).json(itemError);

        return;
      }

      item.name = name;
      await item.save();

      res.status(200).json({
        id: item.id,
        ...messages.items.updated
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  /**
   * PUT запрос. Меняет флаг isCompleted
   * ex. http://localhost:8080/api/items/complete/:id
   */
  async setCompleted(req, res) {
    try {
      const reqId = req.params.id;
      const item = await Items.findOne({ where: { id: reqId } });

      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }
      item.isCompleted = !item.isCompleted;
      await item.save();

      res.status(200).json({
        id: item.id,
        ...messages.items.updated
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос. Удаление карточки
   * ex. http://localhost:8080/api/items/:id
   */
  async deleteItem(req, res) {
    try {
      const reqId = req.params.id;
      const item = await Items.findOne({ where: { id: reqId } });

      if (item) {
        await Items.destroy({ where: { id: reqId } });
        res.status(200).json({
          id: item.id,
          ...messages.items.deleted
        });

        return;
      }

      res.status(400).json(errors.items.notDefined);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * Фильтр запросов через параметры
   * ex. http://localhost:8080/api/items/filter?key=value
   * ex. http://localhost:8080/api/items/filter?isCompleted=true&parentId=1
  */
  filterItems = async (req, res) => {
    try {
      const where = {};

      for (const key in req.query) {
        if (Object.hasOwnProperty.call(req.query, key)) {
          const value = req.query[key];
          if (Object.keys(ItemsController.types).includes(key.toLowerCase())) {
            let booleanValue;

            if (value === 'true') {
              booleanValue = 1;
            }

            if (value === 'false') {
              booleanValue = 0;
            }

            if (key === 'parentId') {
              if (!Number.isInteger(Number(value))) {
                res.status(400).json(errors.types.number);
                return;
              }
            }

            where[key] = (key === 'name')
              ? { [Op.like]: `%${value}%` }
              : booleanValue ?? value;
          }
        }
      }
      const items = await Items.findAll({ where });

      res.status(200).json(items);

      return;
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос
   * Удаление всех карточек
   * ex. http://localhost:8080/api/items
   */
  async deleteAll(req, res) {
    try {
      Items.destroy({ truncate: true });

      res.json(messages.items.deletedAll);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * PUT запрос
   * Пометить сразу все карточки выполненными/невыполненными
   * ex. http://localhost:8080/api/items/complete/all/false
   * ex. http://localhost:8080/api/items/complete/all/true
   */
  async toggleCompleteAll(req, res) {
    try {
      const reqBoolean = req.params.boolean;
      if (reqBoolean === 'true' || reqBoolean === 'false') {
        const boolean = reqBoolean === 'true' ? true : false;
        await Items.update({ isCompleted: boolean }, { where: { isCompleted: !boolean } });
        res.json(messages.items.updatedAll);

        return;
      }

      res.status(400).json(errors.items.incorrectlyProp);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос
   * Удаление всех выполненных карточек
   * ex. http://localhost:8080/api/items/complete/all
   */
  async deleteComplete(req, res) {
    try {
      await Items.destroy({ where: { isCompleted: true } });

      res.json(messages.items.deleteComplete);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new ItemsController();
