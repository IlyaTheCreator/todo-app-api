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
   * Возвращает массив из id всех его дочерних элементов на всех уровнях вложенности.
   * @param parentId id главного родителя (с которого начинается поиск дочерних элементов)
   */
  static async getAllNestedChildrenIds(parentId) {
    const childrenIds = [];
    
    async function findChildren(ids) {
      const items = await Items.findAll({ where: {parentId: ids} });

      // останавливаем метод, если в свойстве parentId хотя бы одного
      // из дочерних элементов указан его собственный ID
      // или если элемент уже был извлечен ранее в рекурсивной цепочке
      if (items.some(item => item.id == item.parentId || childrenIds.includes(item.id))) {
        return;
      }

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
   * Статический метод, который проверяет значение свойства isCompleted
   * у всех вышестоящих родителей элемента по его parentId
   * и в зависимости от переданного условия при необходимости изменяет
   * значение isCompleted каждого родителя на нужное значение
   */
  static async updateParentsIsCompletedIfIt(condition, parentId) {
    // инициализируем массив, в котором метод вернет ID всех
    // рекурсивно обновленных родительских элементов
    const parents = [];

    // функция для рекурсивного обновления
    async function updateParentIsCompleted(parentId) {
      if (!parentId) {
        return;
      }
  
      const parent = await Items.findOne({ where: { id: parentId } });

      // останавливаем метод, если элемент не найден,
      // или в его свойстве parentId указан его собственный ID,
      // или родитель уже был извлечен ранее в рекурсивной цепочке
      if (!parent || parent.id == parent.parentId || parents.includes(parent.id)) {
        return;
      }

      switch (condition) {
        // если передано условие 'IS_NOT_FALSE', то проверяем у родителя
        // значение свойства isCompleted и при необходимости изменяем его на false
        case 'IS_NOT_FALSE':
          // если isCompleted родителя уже равно false, то останавливаем метод
          if (parent.isCompleted == false) {
            return;
          }

          // в противном случае перезаписываем свойство и добавляем ID родителя в массив
          await Items.update({ isCompleted: false }, { where: { id: parentId } });
          parents.push(parent.id);
          
          break;
        
        // если передано условие 'SHOULD_BE_TRUE', то проверяем у родителя
        // значение свойства isCompleted и при необходимости изменяем его на true,
        // если у всех его детей isCompleted также равно true.
        case 'SHOULD_BE_TRUE':
          // если isCompleted родителя уже равно true, то останавливаем метод
          if (parent.isCompleted == true) {
            return;
          }
          
          // собираем всех соседних дочерних элементов по id родителя
          const allSiblings = await Items.findAll({ where: { parentId } });
      
          // собираем в массив значения isCompleted у всех дочерних элементов
          const siblingsPropsArr = allSiblings.map(sibling => sibling.isCompleted);
          
          // если все значения isCompleted в массиве равны true,
          // то задаем isCompleted родителя true и добавляем его ID в массив
          if (siblingsPropsArr.every(prop => prop)) {
            await Items.update(
              { isCompleted: true },
              { where: { id: parentId } }
            );
            parents.push(parent.id);
          }
        
          break;
      
        default:
          break;
      }
  
      // обновляем isCompleted у вышестоящих родителей рекурсивно
      await updateParentIsCompleted(parent.parentId);
    }

    await updateParentIsCompleted(parentId);
    return parents;
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

      const allChildren = await Items.findAll({ where: { parentId: item.id } });
      const allChildrenIds = allChildren.map(item => item.id);

      const allNestedChildrenIds = await Promise.all(allChildrenIds.map(
        id => ItemsController.getAllNestedChildrenIds(id)
      ));

      for (let i = 0; i < allChildren.length; i++) {
        allChildren[i].dataValues.childrenAllNested = allNestedChildrenIds[i];
      }
      
      item.dataValues.children = allChildren;

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

      // проверяем и при необходимости обновляем значения isCompleted у всех родителей элемента на случай,
      // если до добавления все его соседние компоненты вместе с родителем имели значение isCompleted = true
      if (parentId) {
        await ItemsController.updateParentsIsCompletedIfIt('IS_NOT_FALSE', parentId);
      }

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

      // определяем новое свойство isCompleted, противоположное предыдущему
      const prevIsCompleted = item.isCompleted;
      const newIsCompleted = !prevIsCompleted;

      // собираем в массив ID всех дочерних элементов только с таким же предыдущим значением isCompleted
      // при условии, что в свойстве parentId элемента не указан его собственный ID
      const allSameCompletedChildren = (item.id != item.parentId)
        ? await Items.findAll({ where: { parentId: item.id, isCompleted: prevIsCompleted } })
        : [];
      const allSameCompletedChildrenIds = allSameCompletedChildren.map(item => item.id);

      // собираем для каждого такого дочернего элемента в отдельный массив
      // ID всех в свою очередь его вложенных дочерних элементов на всех уровнях вложенности,
      // получаем массив из таких массивов
      const allNestedSameCompletedChildrenIds = await Promise.all(allSameCompletedChildrenIds.map(
        id => ItemsController.getAllNestedChildrenIds(id)
      ));

      // изменяем всем им значение isCompleted на новое
      await Items.update(
        { isCompleted: newIsCompleted },
        { 
          where: {
            isCompleted: prevIsCompleted,
            id: [item.id, ...allSameCompletedChildrenIds, ...allNestedSameCompletedChildrenIds.flat()] 
          }
        }
      );

      // проверяем и при необходимости обновляем значения isCompleted у всех родителей элемента
      // в зависимости от нового значения isCompleted самого элемента,
      // сохраняем все ID измененных родителей, начиная с самого близкого, в массив updatedParents
      const updatedParents = await ItemsController.updateParentsIsCompletedIfIt(
        newIsCompleted == false ? 'IS_NOT_FALSE' : 'SHOULD_BE_TRUE',
        item.parentId
      );

      // в свойство id.parents помещаем массив с ID всех родителей с изменившимся isCompleted,
      // в свойство id.children ответа помещаем массив из объектов дочерних элементов
      // с переключенным значением isCompleted, в каждом из которых в свойстве current
      // передаем id дочернего элемента, а в свойстве childrenAllNested -
      // массив всех в свою очередь его дочерних элементов на всех уровнях вложенности
      res.status(200).json({
        id: {
          current: item.id,
          parents: updatedParents,
          children: allSameCompletedChildrenIds.map((id, index) => ({current: id, childrenAllNested: allNestedSameCompletedChildrenIds[index]})),
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
      
      // check if an item with this ID exists
      const item = await Items.findOne({ where: { id } });
      if (!item) {
        res.status(400).json(errors.items.notDefined);

        return;
      }

      // check if the given boolean value is valid
      if (boolean !== 'true' && boolean !== 'false') {
        res.status(400).json(errors.items.incorrectlyBooleanProp);

        return;
      }

      const booleanValue = boolean === 'true' ? true : false;

      // собираем в массив ID всех дочерних элементов только с отличающимся от booleanValue значением isCompleted
      // при условии, что в свойстве parentId элемента не указан его собственный ID
      const allDiffChildren = (item.id != item.parentId)
        ? await Items.findAll({ where: { parentId: item.id, isCompleted: !booleanValue } })
        : [];
      const allDiffChildrenIds = allDiffChildren.map(item => item.id);

      // собираем для каждого такого дочернего элемента в отдельный массив
      // ID всех в свою очередь его вложенных дочерних элементов на всех уровнях вложенности,
      // получаем массив из таких массивов
      const allNestedDiffChildrenIds = await Promise.all(allDiffChildrenIds.map(
        id => ItemsController.getAllNestedChildrenIds(id)
      ));

      // изменяем всем им значение isCompleted на заданное
      await Items.update(
        { isCompleted: booleanValue },
        {
          where: {
            isCompleted: !booleanValue,
            id: [item.id, ...allDiffChildrenIds, ...allNestedDiffChildrenIds.flat()]
          }
        }
      );

      // проверяем и при необходимости обновляем значения isCompleted у всех родителей элемента
      // в зависимости от нового значения isCompleted самого элемента,
      // сохраняем все ID измененных родителей, начиная с самого близкого, в массив updatedParents
      const updatedParents = await ItemsController.updateParentsIsCompletedIfIt(
        booleanValue == false ? 'IS_NOT_FALSE' : 'SHOULD_BE_TRUE',
        item.parentId
      );

      // в свойство id.parents помещаем массив с ID всех родителей с изменившимся isCompleted,
      // в свойство id.children ответа помещаем массив из объектов дочерних элементов
      // с переключенным значением isCompleted, в каждом из которых в свойстве current
      // передаем id дочернего элемента, а в свойстве childrenAllNested -
      // массив всех в свою очередь его дочерних элементов на всех уровнях вложенности
      res.status(200).json({
        id: {
          current: item.id,
          parents: updatedParents,
          children: allDiffChildrenIds.map((id, index) => ({current: id, childrenAllNested: allNestedDiffChildrenIds[index]})),
        },
        ...messages.items.updatedAll
      });
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

      // собираем в массив ID всех дочерних элементов удаляемого элемента
      // при условии, что в свойстве parentId элемента не указан его собственный ID
      const allChildren = (item.id != item.parentId)
        ? await Items.findAll({ where: { parentId: item.id } })
        : [];
      const allChildrenIds = allChildren.map(item => item.id);

      // собираем для каждого такого дочернего элемента в отдельный массив
      // ID всех в свою очередь его вложенных дочерних элементов на всех уровнях вложенности,
      // получаем массив из таких массивов
      const allNestedChildrenIds = await Promise.all(allChildrenIds.map(
        id => ItemsController.getAllNestedChildrenIds(id)
      ));

      // удаляем текущий элемент вместе со всеми его дочерними элементами
      await Items.destroy({ where: { id: [item.id, ...allChildrenIds, ...allNestedChildrenIds.flat()] } });

      // проверяем и при необходимости обновляем значения isCompleted у всех родителей удаленного элемента
      // на случай, если у всех оставшихся его соседей значение isCompleted равно true,
      // сохраняем все ID измененных родителей, начиная с самого близкого, в массив updatedParents
      const updatedParents = await ItemsController.updateParentsIsCompletedIfIt('SHOULD_BE_TRUE', item.parentId);

      // в свойство id.parents помещаем массив с ID всех родителей с изменившимся isCompleted,
      // в свойство id.children ответа помещаем массив из объектов дочерних элементов,
      // также удаленных вместе с текущим, в каждом из которых в свойстве current
      // передаем id дочернего элемента, а в свойстве childrenAllNested -
      // массив всех в свою очередь его дочерних элементов на всех уровнях вложенности
      res.status(200).json({
        id: {
          current: item.id,
          parents: updatedParents,
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
   * ex. http://localhost:8080/api/items/:id/complete
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

      // собираем в массив ID всех дочерних элементов со значением isCompleted = true
      // при условии, что в свойстве parentId элемента не указан его собственный ID
      const allCompletedChildren = (item.id != item.parentId)
        ? await Items.findAll({ where: { parentId: item.id, isCompleted: true } })
        : [];
      const allCompletedChildrenIds = allCompletedChildren.map(item => item.id);

      // собираем для каждого такого дочернего элемента в отдельный массив
      // ID всех в свою очередь его вложенных дочерних элементов на всех уровнях вложенности,
      // получаем массив из таких массивов
      const allNestedChildrenIds = await Promise.all(allCompletedChildrenIds.map(
          id => ItemsController.getAllNestedChildrenIds(id)
        ));

      // удаляем все выполненные дочерние элементы вместе со всеми в свою очередь их дочерними элементами
      await Items.destroy({ where: { id: [...allCompletedChildrenIds, ...allNestedChildrenIds.flat()] } });

      // в свойство id.children ответа помещаем массив из объектов удаленных
      // выполненных дочерних элементов, в каждом из которых в свойстве current
      // передаем id дочернего элемента, а в свойстве childrenAllNested -
      // массив всех в свою очередь его дочерних элементов на всех уровнях вложенности
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
