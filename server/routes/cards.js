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
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           description: |
 *            Custom error type. Possible values are:
 *            * 1 - property is not defined
 *            * 2 - name must be unique
 *            * 3 - isCompleted is not boolean
 *            * 4 - name is not a string
 *            * 5 - listId is not a number
 *            * 6 - property value is incorrect
 *            * 7 - card is not defined
 *            * 8 - property cannot be empty
 *            * 9 - list is not defined
 *            * 10 - no entity with provided id
 *         message:
 *           type: string
 *           description: Text of an error
 *       example:
 *         statusCode: 4
 *         message: The value of IsCompleted can be either true(1) or false(0)
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
 *     summary: Returns the list of all the cards that match specified query
 *     tags: [Cards]
 *     parameters:
 *       - in: query
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: A parameter by which cards will be filtered
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Value of the choosen parameter
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

/**
 * @swagger
 * /api/cards/{id}:
 *   get:
 *     summary: Returns single card by its id
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Existing city id
 *     responses:
 *       200:
 *         description: Single found card
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.get('/cards/:id', cardController.getCard);

/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Adds new card
 *     tags: [Cards]
 *     requestBody:
 *       description: Task to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name 
 *               - listId
 *             properties:
 *               name:
 *                 type: string
 *               listId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Card created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.post('/cards', cardController.addCard);


/**
 * @swagger
 * /api/card/{id}:
 *   put:
 *     summary: Sets a name of a card
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: A parameter by which a card name will be edited
 *     requestBody:
 *       description: A name to be edited.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: The card with a new name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.put('/cards/:id', cardController.setNameCard);

/**
 * @swagger
 * /api/cards:
 *   put:
 *     summary: Edits existing card's isCompleted property by its id
 *     tags: [Cards]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: A parameter by which a card will be edited
 *     requestBody:
 *       description: Task to be edited.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isCompleted 
 *             properties:
 *               idCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Card edited successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.put('/cards/complete/:id', cardController.setCompleted);

/**
 * @swagger
 * /api/cards/{id}:
 *   delete:
 *     summary: Deletes single card by its id
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Existing city id
 *     responses:
 *       200:
 *         description: Card deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 */
router.delete('/cards/:id', cardController.deleteCard);

module.exports = router;
