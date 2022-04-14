const Router = require('express');
const listController = require('../controllers/listController');

const router = new Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     List:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of a list
 *         name:
 *           type: string
 *           description: List title
 *       example:
 *         id: 1
 *         name: Today's ToDos
 */

 /**
  * @swagger
  * tags:
  *   name: Lists
  *   description: Managing lists
  */

/**
 * @swagger
 * /api/lists:
 *   post:
 *     summary: Adds a new list
 *     tags: [Lists]
 *     requestBody:
 *       description: List to be created.
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
 *         description: List created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 */
router.post('/lists', listController.addList);

/**
 * @swagger
 * /api/lists:
 *   get:
 *     summary: Returns all the lists
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: The lists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/List'
 */
router.get('/lists', listController.getLists);

/**
 * @swagger
 * /api/lists/{id}:
 *   delete:
 *     summary: Deletes a single list by its id
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Existing list id
 *     responses:
 *       200:
 *         description: List deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 */
router.delete('/lists/:id', listController.deleteList);

/**
 * @swagger
 * /api/lists/{id}:
 *   put:
 *     summary: Sets a name of a list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: A parameter by which a list title will be edited
 *     requestBody:
 *       description: A title to be edited.
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
 *         description: The list with a new name
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/List'
 */
router.put('/lists/:id', listController.setNameList);

module.exports = router;
