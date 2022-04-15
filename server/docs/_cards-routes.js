/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Returns the list of all the cards
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: The list of the cards (can be empty)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *               properties:
 *                data: 
 *                  type: array
 *                  items: 
 *                    type: object
 *                    properties:
 *                      id: 
 *                        type: integer
 *                        example: 2281337
 *                      name: 
 *                        type: string
 *                        example: "Throw out the trash"
 *                      isCompleted: 
 *                        type: boolean
 *                        example: false
 *                      listId:
 *                        type: integer
 *                        example: 2281337
 *       500:
 *         description: Internal server error. Could not get cards
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

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
 *       400:
 *         description: Card parameters validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *              statusCode: 1
 *              name: "some-error"
 *              message: "some error message"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

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
 *         description: Existing card id
 *     responses:
 *       200:
 *         description: Single found card
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *               properties:
 *                data: 
 *                  type: object
 *                  properties:
 *                    id: 
 *                      type: integer
 *                      example: 2281337
 *                    name: 
 *                      type: string
 *                      example: "Throw out the trash"
 *                    isCompleted: 
 *                      type: boolean
 *                      example: false
 *                    listId:
 *                      type: integer
 *                      example: 2281337
 *       400:
 *         description: Card with such id is not defined
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *              statusCode: 1
 *              name: "some-error"
 *              message: "some error message"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

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
 *       201:
 *         description: Card created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *             example:
 *              "Card added"
 *       400:
 *         description: Card data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *              statusCode: 1
 *              name: "some-error"
 *              message: "some error message"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/cards/{id}:
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
 *       202:
 *         description: The card was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *             example:
 *              "updated"
 *       400:
 *         description: Card data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *              statusCode: 1
 *              name: "some-error"
 *              message: "some error message"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

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
 *       202:
 *         description: The card was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *             example:
 *              "updated"
 *       400:
 *         description: Card data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *              statusCode: 1
 *              name: "some-error"
 *              message: "some error message"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

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
 *         description: Existing card id
 *     responses:
 *       202:
 *         description: Card deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *             example:
 *              "Card with Id = 2 is deleted"
 *       400:
 *         description: Card id validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *             example:
 *              statusCode: 1
 *              name: "some-error"
 *              message: "some error message"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */
