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
   * Возвращает массив из id всех его дочерних элементов.
   * @param {initialId} number id главного родителя (с которого начинается поиск дочерних элементов)
   */
  static async getAllChildrenIds(parentId) {
    const childrenIds = [];
    
    async function findChildren(ids) {
      const items = await Items.findAll({ where: {parentId: ids} });

      if (items.length) {
        const currentIds = items.map(item => item.id);
        childrenIds.push(...currentIds);

        await findChildren(currentIds);
      }
    }

    await findChildren(parentId);
    return childrenIds;
  }

  /**
   * GET запрос. Получение всех корневых элементов
   * ex. http://localhost:8080/api/items
   */
  async getRootItems(req, res) {
    try {
      const items = await Items.findAll({ where: { parentId: Items.getAttributes().parentId.defaultValue } });

      if (!items) {
        res.json(messages.items.noData);
      }

      res.json(items);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * GET запрос. Получение всех элементов
   * ex. http://localhost:8080/api/items/all
   */
  async getAllItems(req, res) {
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

        // check if the item with this ID exists
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
   * POST запрос. Добавление элемента. Данные принимаются из тела запроса
   * ex. http://localhost:8080/api/items
   */
  addItem = async (req, res) => {
    try {
      const { name, parentId } = req.body;

      if (parentId) {
        // check if the item with this parent ID exists
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
  setItemName = async (req, res) => {
    try {
      const reqId = req.params.id;
      const item = await Items.findOne({ where: { id: reqId } });

      // check if the item with this ID exists
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

      // check if the item with this ID exists
      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      const isCompleted = item.isCompleted;

      const allChildrenIds = await ItemsController.getAllChildrenIds(item.id);
      await Items.update(
          { isCompleted: !isCompleted },
          { where: { isCompleted, id: [item.id, ...allChildrenIds] } }
        );

      res.status(200).json({
        id: {
          parent: item.id,
          childrenAll: allChildrenIds
        },
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
      
      // check if the item with this ID exists
      const item = await Items.findOne({ where: { id } });
      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      if (boolean === 'true' || 'false') {
        const booleanValue = boolean === 'true' ? true : false;

        const allChildrenIds = await ItemsController.getAllChildrenIds(id);
        await Items.update(
            { isCompleted: booleanValue },
            { where: { isCompleted: !booleanValue, id: [item.id, ...allChildrenIds] } }
          );

        res.status(200).json({
          id: {
            parent: item.id,
            childrenAll: allChildrenIds
          },
          ...messages.items.updatedAll
        });

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
      const { id } = req.params;
      const item = await Items.findOne({ where: { id } });

      // check if the item with this ID exists
      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      const allChildren = await Items.findAll({ where: { parentId: item.id } });
      const allChildrenIds = allChildren.map(item => item.id);

      const allNestedChildrenIds = await Promise.all(allChildrenIds.map(
        id => ItemsController.getAllChildrenIds(id)
      ));

      await Items.destroy({ where: { id: [item.id, ...allChildrenIds, ...allNestedChildrenIds] } });

      res.status(200).json({
        id: {
          current: item.id,
          children: allChildrenIds.map((id, index) => ({current: id, childrenAllNested: allNestedChildrenIds[index]})),
        },
        ...messages.items.deleted
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос
   * Удаление всех выполненных элементов
   * ex. http://localhost:8080/api/items/complete/all
   */
  async deleteAllCompleted(req, res) {
    try {
      const { id } = req.params;
      const item = await Items.findOne({ where: { id } });

      // check if the item with this ID exists
      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      const allCompletedChildren = await Items.findAll({ where: { parentId: item.id, isCompleted: true } });
      const allCompletedChildrenIds = allCompletedChildren.map(item => item.id);

      const allNestedChildrenIds = await Promise.all(allCompletedChildrenIds.map(
          id => ItemsController.getAllChildrenIds(id)
        ));

      await Items.destroy({ where: { id: [...allCompletedChildrenIds, ...allNestedChildrenIds.flat()] } });

      res.status(200).json({
        id: {
          current: item.id,
          children: allCompletedChildrenIds.map((id, index) => ({current: id, childrenAllNested: allNestedChildrenIds[index]})),
        },
        ...messages.items.deleteComplete
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new ItemsController();
