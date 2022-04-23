const { Op } = require("sequelize");

const Cards = require("../db/tables/Cards");
const BaseController = require("./baseController");
const { errors } = require("../rules/errors");
const { messages } = require("../rules/messages");

class CardController extends BaseController {
  constructor() {
    super(Cards);
  }
  
  /**
   * POST запрос. Добавление карточки. Данные принимаются из тела запрсоа
   * ex. http://localhost:8080/api/cards
   */
  addCard = async (req, res) => {
    try {
      const { name, parentId } = req.body;

      if (parentId) {
        const parentCard = await Cards.findOne({ where: { id: parentId } });

        if (!parentCard) {
          res.status(400).json(errors.cards.noParent);

          return;
        }
      }

      const card = parentId ? { name, parentId } : { name };
      const cardError = this.validate(card, CardController.types);

      if (cardError) {
        res.status(400).json(cardError);

        return;
      }

      const data = await Cards.create(card);

      res.status(201).json({
        id: data.id,
        ...messages.card.added
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * GET запрос. Получение всех карточек
   * ex. http://localhost:8080/api/cards
   */
  async getCards(req, res) {
    try {
      const cards = await Cards.findAll();

      if (!cards) {
        res.json(messages.card.noData);
      }

      res.json(cards);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * GET запрос. Получение карточки по id
   * ex. http://localhost:8080/api/cards/:id
   */
  async getCard(req, res) {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });

      if (!card) {
        res.status(400).json(errors.cards.notDefined);

        return;
      }

      res.json(card);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * PUT запрос. Обновление имени для карточки
   * ex. http://localhost:8080/api/cards/:id
   * Имя принимает из тела запроса
   */
  setNameCard = async (req, res) => {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });
      const { name } = req.body;

      if (!card) {
        res.status(400).json(errors.cards.notDefined);

        return;
      }

      const cardError = this.validate({ name }, CardController.types);

      if (cardError) {
        res.status(400).json(cardError);

        return;
      }

      card.name = name;
      await card.save();

      res.status(200).json({
        id: card.id,
        ...messages.card.updated
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  /**
   * PUT запрос. Меняет флаг isCompleted
   * ex. http://localhost:8080/api/card/complete/:id
   */
  async setCompleted(req, res) {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });

      if (!card) {
        res.status(400).json(errors.cards.notDefined);

        return;
      }
      card.isCompleted = !card.isCompleted;
      await card.save();

      res.status(200).json({
        id: card.id,
        ...messages.card.updated
      });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос. Удаление карточки
   * ex. http://localhost:8080/api/cards/:id
   */
  async deleteCard(req, res) {
    try {
      const reqId = req.params.id;
      const card = await Cards.findOne({ where: { id: reqId } });

      if (card) {
        await Cards.destroy({ where: { id: reqId } });
        res.status(200).json({
          id: card.id,
          ...messages.card.deleted
        });

        return;
      }

      res.status(400).json(errors.cards.notDefined);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * Фильтр запросов через параметры
   * ex. http://localhost:8080/api/cards/filter?key=value
   * ex. http://localhost:8080/api/cards/filter?isCompleted=true&parentId=1
  */
  filterCards = async (req, res) => {
    try {
      const where = {};

      for (const key in req.query) {
        if (Object.hasOwnProperty.call(req.query, key)) {
          const value = req.query[key];
          if (Object.keys(CardController.types).includes(key.toLowerCase())) {
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
      const cards = await Cards.findAll({ where });

      res.status(200).json(cards);

      return;
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос
   * Удаление всех карточек
   * ex. http://localhost:8080/api/cards
   */
  async deleteAll(req, res) {
    try {
      Cards.destroy({ truncate: true });

      res.json(messages.card.deletedAll);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * PUT запрос
   * Пометить сразу все карточки выполненными/невыполненными
   * ex. http://localhost:8080/api/cards/complete/all/false
   * ex. http://localhost:8080/api/cards/complete/all/true
   */
  async toggleCompleteAll(req, res) {
    try {
      const reqBoolean = req.params.boolean;
      if (reqBoolean === 'true' || reqBoolean === 'false') {
        const boolean = reqBoolean === 'true' ? true : false;
        await Cards.update({ isCompleted: boolean }, { where: { isCompleted: !boolean } });
        res.json(messages.card.updatedAll);

        return;
      }

      res.status(400).json(errors.cards.incorrectlyProp);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * DELETE запрос
   * Удаление всех выполненных карточек
   * ex. http://localhost:8080/api/cards/complete/all
   */
  async deleteComplete(req, res) {
    try {
      await Cards.destroy({ where: { isCompleted: true } });

      res.json(messages.card.deleteComplete);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new CardController();
