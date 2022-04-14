const Cards = require('../db/tables/Cards');
const { errors } = require('../rules/errors');

class CardController {
  static types = {};

  constructor() {
    //Записываем в статическое свойство types объект со значениями и типами данных полей
    Object.keys(Cards.getAttributes()).forEach((key) => {
      if (Cards.getAttributes()[key].type.key === 'INTEGER') {
        CardController.types[key.toLowerCase()] = 'number';

        return;
      }

      CardController.types[key.toLowerCase()] = Cards.getAttributes()[key].type.key.toLowerCase();
    });
  }

  /**
    * POST запрос. Добавление карточки. Данные принимаются из тела запрсоа
    * ex. http://localhost:8080/api/card
   */
  async addCard(req, res) {
    try {
      const { name, listId } = req.body;
      const card = { name, listId };

      if (!name || !name.toString().trim()) {
        res.json(errors.filed.isNotEmpty('name'));

        return;
      }

      if (!listId || !listId.toString().trim()) {
        res.json(errors.filed.isNotEmpty('listId'));

        return;
      }

      // Ошибка если тип name не равен типу из таблицы
      if (typeof name !== CardController.types.name) {
        res.json(errors.types.general('name'));
        return;
      }

      // Ошибка если тип listId не равен типу из таблицы
      if (typeof listId !== CardController.types.listid) {
        res.json(errors.types.general('listId'));
        return;
      }

      await Cards.create(card);
      res.json('Card added');
    } catch (e) {
      if (e.toString().toLowerCase().includes('foreign')) {
        res.json(errors.cards.fk_added);

        return;
      }

      console.log(e);
      res.json(e);
    }
  };

  /**
   * GET запрос. Получение всех карточек
   * ex. http://localhost:8080/api/cards
  */
  async getCards(req, res) {
    try {
      const cards = await Cards.findAll();

      if (!cards) {
        res.json('There are no cards');
      }

      res.json({ data: cards });
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  };

  /**
   * GET запрос. Получение карточки по id
   * ex. http://localhost:8080/api/card/<id>
  */
  async getCard(req, res) {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });

      if (!card) {
        res.json(errors.cards.notDefined);

        return;
      }

      res.json({ data: card });
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  }

  /**
   * PUT запрос. Обновление имени для карточки
   * ex. http://localhost:8080/api/card/<id>
   * Имя принимает из тела запроса
   */
  async setNameCard(req, res) {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });
      const { name } = req.body;

      if (!card) {
        res.json(errors.cards.notDefined);

        return;
      }

      if (!name || !name.toString().trim()) {
        res.json(errors.filed.isNotEmpty('name'));

        return;
      }

      if (typeof name !== CardController.types.name) {
        res.json(errors.types.general('name'));

        return;
      }

      card.name = name;
      await card.save();

      res.json('Updated');
    } catch (e) {
      const { message } = e.errors[0];
      res.json(message);
    }
  }

  /**
   * PUT запрос. Меняет флаг isCompleted
   * ex. http://localhost:8080/api/card/complete/<id>
   */
  async setCompleted(req, res) {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });

      if (!card) {
        res.json(errors.cards.notDefined);

        return;
      }
      card.isCompleted = !card.isCompleted;
      await card.save();

      res.json('Updated');
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  }

  /**
   * DELETE запрос. Удаление карточки
   * ex. http://localhost:8080/api/card/<id>
   */
  async deleteCard(req, res) {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });

      if (card) {
        await Cards.destroy({ where: { id: reqId } });
        res.json(`Card with Id = ${reqId} is deleted`);

        return;
      }

      res.json(errors.cards.notDefined);
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  }

  /**
   * Фильтр запросов через параметры
   * ex. http://localhost:8080/api/cards/filter?name=card 3
   * ex. http://localhost:8080/api/cards/filter?isCompleted=1
  */
  async filterCards(req, res) {
    try {
      const { key, value } = req.query;

      // Проверка есть ли такой параметр
      if (Object.keys(CardController.types).includes(key.toLowerCase())) {
        let booleanValue;
        if (key === 'isCompleted') {
          if (value === 'true') {
            booleanValue = 1;
          }

          if (value === 'false') {
            booleanValue = 0;
          }
        }

        if (typeof value === CardController.types[key]) {
          const cards = await Cards.findAll({ where: { [key]: [booleanValue ?? value] } });
          res.json({ date: cards });

          return;
        }

        res.json(errors.types.general(key));
        return;
      }

      res.json(errors.cards.filter);
    } catch (e) {
      res.json(e);
    }
  };
};

module.exports = new CardController();
