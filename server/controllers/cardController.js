const Cards = require("../db/tables/Cards");
const BaseController = require("./baseController");
const { errors, messages } = require("../rules/errors");

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
      const { name, listId } = req.body;
      const card = { name, listId };
      const cardError = this.validate(card, CardController.types);

      if (cardError) {
        res.status(409).json(cardError);

        return;
      }

      const data = await Cards.create(card);
      res.status(200).json({
        id: data.id,
        ...messages.card.added
      });
    } catch (e) {
      if (e.toString().toLowerCase().includes("foreign")) {
        res.status(409).json(errors.cards.fk_added);

        return;
      }

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

      res.json({ data: cards });
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
        res.status(409).json(errors.cards.notDefined);

        return;
      }

      res.json({ data: card });
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
        res.status(409).json(errors.cards.notDefined);

        return;
      }

      const cardError = this.validate({ name }, CardController.types);

      if (cardError) {
        res.status(409).json(cardError);

        return;
      }

      card.name = name;
      await card.save();

      res.status(200).json(messages.card.updated);
    } catch (e) {
      res.status(409).json(e);
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
        res.status(409).json(errors.cards.notDefined);

        return;
      }
      card.isCompleted = !card.isCompleted;
      await card.save();

      res.status(200).json(messages.card.updated);
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
        res.status(200).json(messages.card.deleted);

        return;
      }

      res.status(409).json(errors.cards.notDefined);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  /**
   * Фильтр запросов через параметры
   * ex. http://localhost:8080/api/cards/filter?key=name&value=card
   * ex. http://localhost:8080/api/cards/filter?key=isCompleted&value=true
  */
  filterCards = async (req, res) => {
    try {
      const { key } = req.query;
      const value = req.query.value.toLowerCase();

      if (!key) {
        this.getCards(req, res);

        return;
      }

      // Проверка есть ли такой параметр
      if (Object.keys(CardController.types).includes(key.toLowerCase())) {
        let booleanValue;
        if (value === 'true') {
          booleanValue = 1;
        }

        if (value === 'false') {
          booleanValue = 0;
        }

        const cards = await Cards.findAll({ where: { [key]: [booleanValue ?? value] } });
        res.json({ data: cards });

        return;
      }

      res.status(409).json(errors.cards.filter);
    } catch (e) {
      res.status(500).json(e);
    }
  }


  //NOT WORKING :(
  /**
   * Фильтр запросов через параметры
   * ex. http://localhost:8080/api/cards/multifilter?key=value
   * ex. http://localhost:8080/api/cards/multifilter?isCompleted=true&listId=1
  */
  multiFilterCards = async (req, res) => {
    try {
      const where = {};

      console.log(req.query);
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

            where[key] = booleanValue ?? value
          }

        }
        const cards = await Cards.findAll({ where });

        res.json({ data: cards });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async allDelete(req, res) {
    try {
      Cards.destroy({ truncate: true });

      res.json({ data: { message: 'Все карточки удалены' } });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async allComplete(req, res) {
    try {
      const reqBoolean = req.params.boolean;
      if (reqBoolean === 'true' || reqBoolean === 'false') {
        const boolean = reqBoolean === 'true' ? true : false;
        await Cards.update({ isCompleted: boolean }, { where: { isCompleted: !boolean } });
        res.json({ data: { message: 'Карточки обновлены' } });

        return;
      }

      res.status(400).json(errors.cards.incorrectlyProp);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

module.exports = new CardController();
