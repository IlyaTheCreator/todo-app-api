const Router = require('express');
const cardController = require('../controllers/cardController');

const router = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - name
 *         - isCompleted
 *         - listId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the card
 *         name:
 *           type: string
 *           description: Text of a task
 *         isCompleted:
 *           type: boolean
 *           description: The card completion state
 *         listId:
 *           type: string
 *           description: Id of a list the card belongs to
 *       example:
 *         id: d5fE_asz
 *         name: Throw out the trash
 *         isCompleted: false
 *         listId: 3
 */

 /**
  * @swagger
  * tags:
  *   name: Cards
  *   description: Managing cards
  */

/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Returns the list of all the cards
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: The list of the cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */

router.get('/cards', cardController.getCards);

/**
 * @swagger
 * /api/cards/filter:
 *   get:
 *     summary: Returns the list of all the cards that match isCompleted value in the query
 *     tags: [Cards]
 *     parameters:
 *       - in: query
 *         name: isCompleted
 *         schema:
 *           type: boolean
 *         required: true
 *         description: Cards' completion state by which they'll be filtered
 *     responses:
 *       200:
 *         description: The list of the filtered cards
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.get('/cards/filter', cardController.filterCards);
router.get('/card/:id', cardController.getCard);
router.post('/card', cardController.addCard);
router.put('/card/:id', cardController.setNameCard);
router.put('/card/complete/:id', cardController.setCompleted);
router.delete('/card/:id', cardController.deleteCard);

module.exports = router;
