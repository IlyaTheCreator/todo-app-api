const { Op } = require("sequelize");

const Items = require("../db/tables/items");
const BaseController = require("./base-controller");
const { errors } = require("../rules/errors");
const { messages } = require("../rules/messages");

class ItemsController extends BaseController {
  constructor() {
    super(Items);
  }

  /**
   * Статический метод для сбора всех id дочерних элементов по id родителя.
   * Возвращает массив из id родителя и всех его дочерних элементов.
   * @param {initialId} number id главного родителя (с которого начинается поиск дочерних элементов)
   */
  static async addAllChildrenIds(initialId) {
    const childrenIds = [initialId];
    
    async function findChildren(ids) {
      const items = await Items.findAll({ where: {parentId: ids} });

      if (items.length) {
        const currentIds = items.map(item => item.dataValues.id);
        childrenIds.push(...currentIds);

        await findChildren(currentIds);
      }
    }

    await findChildren(childrenIds);
    return childrenIds;
  }

  /**
   * GET запрос. Получение всех элементов
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
   * Фильтр запросов через параметры
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
   * GET запрос. Получение элемента по id
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
   * POST запрос. Добавление элемента. Данные принимаются из тела запрсоа
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
   * PUT запрос. Обновление имени для элемента
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
   * ex. http://localhost:8080/api/items/:id/complete
   */
  async toggleIsCompleted(req, res) {
    try {
      const { id } = req.params;
      const item = await Items.findOne({ where: { id } });

      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      const isCompleted = item.isCompleted;
      const ids = await ItemsController.addAllChildrenIds(item.id);
      await Items.update({ isCompleted: !isCompleted }, { where: { isCompleted, id: ids } });

      res.status(200).json({
        id: ids,
        ...messages.items.updated
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * PUT запрос
   * Пометить элемент, включая все дочерние элементы, выполненными/невыполненными
   * ex. http://localhost:8080/api/items/:id/complete/:boolean
   */
  async setIsCompletedAll(req, res) {
    try {
      const { id, boolean } = req.params;
      
      // try to find the item by id
      const item = await Items.findOne({ where: { id } });
      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      if (boolean === 'true' || 'false') {
        const booleanValue = boolean === 'true' ? true : false;
        const ids = await ItemsController.addAllChildrenIds(id);
        await Items.update({ isCompleted: booleanValue }, { where: { isCompleted: !booleanValue, id: ids } });

        res.status(200).json(messages.items.updatedAll);

        return;
      }

      res.status(400).json(errors.items.incorrectlyProp);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос
   * Удаление всех элементов
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
   * DELETE запрос. Удаление элемента
   * ex. http://localhost:8080/api/items/:id
   */
  async deleteItem(req, res) {
    try {
      const reqId = req.params.id;

      const item = await Items.findOne({ where: { id: reqId } });
      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      await Items.destroy({ where: { id: reqId } });
      res.status(200).json({
        id: item.id,
        ...messages.items.deleted
      });

      return;

      res.status(400).json(errors.items.notDefined);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос
   * Удаление всех выполненных элементов
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
