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