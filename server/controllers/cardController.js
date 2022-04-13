const Cards = require('../db/tables/Cards');
const { availableProperty } = require('../variables');
const { errors } = require('../rules/errors');

class CardController {
  /**
  * POST запрос. Добавление карточки. Данные принимаются из тела запрсоа
  * ex. http://localhost:8080/api/card
 */
  async addCard(req, res) {
    try {
      const { name, isCompleted, listId } = req.body;
      const card = { name, isCompleted, listId };

      await Cards.create(card);
      res.json('Card added');
    } catch (e) {
      if (e.toString().toLowerCase().includes('foreign')) {
        res.json(errors.cards.fk_added);

        return;
      }

      //Небольшая проверка есть ли сообщение об ошибке
      const message = Array.isArray(e.errors) && e.errors[0].message;
      res.json(message || e);
    }
  };

  /**
   * GET запрос. Получение всех карточек
   * ex. http://localhost:8080/api/cards
  */
  async getCards(req, res) {
    try {
      const cards = await Cards.findAll();
      res.json(cards);
    } catch (e) {
      const { message } = e.errors[0];
      res.json(message);
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
        res.json('Card in not defined');

        return;
      }

      res.json(card);
    } catch (e) {
      const { message } = e.errors[0];
      res.json(message);
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

      if (!card) {
        res.json('Card in not defined');

        return;
      }
      card.name = req.body.name;
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
        res.json('Card in not defined');

        return;
      }
      card.isCompleted = !card.isCompleted;
      await card.save();

      res.json('Updated');
    } catch (e) {
      const { message } = e.errors[0];
      res.json(message);
    }
  }

  /**
   * DELETE запрос. Удаление карточки
   * ex. http://localhost:8080/api/card/<id>
   */
  async deleteCard(req, res) {
    try {
      const reqId = req.params.id;
      await Cards.destroy({ where: { id: reqId } });

      res.json(`Card with Id = ${reqId} is deleted`);
    } catch (e) {
      const { message } = e.errors[0] || e;
      res.json(message);
    }
  }

  /**
   * Фильтр запросов через параметры
   * ex. http://localhost:8080/api/cards/filter?name=card 3
   * ex. http://localhost:8080/api/cards/filter?isCompleted=1
  */
  async filterCards(req, res) {
    try {
      const property = req.query;
      const propKeys = Object.keys(property);

      // Проверка есть ли такой параметр
      if (availableProperty.includes(propKeys[0].toLowerCase())
        && propKeys.length !== 0) {
        const cards = await Cards.findAll({ where: property });

        res.json(cards);
        return;
      }

      res.json(errors.cards.filter);
    } catch (e) {
      res.json(e);
    }
  };
};

module.exports = new CardController();