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
 *       201:
 *         description: List created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data: 
 *                   type: object
 *                   properties:
 *                     id: 
 *                       type: integer
 *                       example: 1
 *                     message: 
 *                       type: string
 *                       example: "List added"
 *       400:
 *         description: List data validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data: 
 *                   type: object
 *                   properties:
 *                     statusCode: 
 *                       type: integer
 *                       example: 5
 *                     name: 
 *                       type: string
 *                       example: "incorrect-type"
 *                     message: 
 *                       type: string
 *                       example: "The 'name' type is incorrectly set"
 *       500:
 *         description: Internal server error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 */

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
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data: 
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       id: 
 *                         type: integer
 *                         example: 1
 *                       name: 
 *                         type: string
 *                         example: "First list"
 *       500:
 *         description: Internal server error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 */

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
 *       202:
 *         description: List deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data: 
 *                   type: object
 *                   properties:
 *                     message: 
 *                       type: string
 *                       example: "List deleted"
 *       400:
 *         description: List in not defined
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data: 
 *                   type: object
 *                   properties:
 *                     statusCode: 
 *                       type: integer
 *                       example: 8
 *                     name: 
 *                       type: string
 *                       example: "undefined-list"
 *                     message: 
 *                       type: string
 *                       example: "List is not defined"
 *       500:
 *         description: Internal server error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 */

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
 *       202:
 *         description: The list with a new name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "List updated"
 *       400:
 *         description: List validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data: 
 *                   type: object
 *                   properties:
 *                     statusCode: 
 *                       type: integer
 *                       example: 7
 *                     name: 
 *                       type: string
 *                       example: "empty-field"
 *                     message: 
 *                       type: string
 *                       example: "The 'name' field cannot be empty"
 *       500:
 *         description: Internal server error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 */

/**
 * @swagger
 * /api/lists/{id}:
 *   get:
 *     summary: Returns single list by its id
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
 *         description: Single found list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *             example:
 *               data:
 *                 id: 1 
 *                 name: 'First list'
 *       400:
 *         description: List in not defined
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 *               properties:
 *                 data: 
 *                   type: object
 *                   properties:
 *                     statusCode:
 *                       type: integer
 *                       example: 8
 *                     name: 
 *                       type: string
 *                       example: "undefined-list"
 *                     message: 
 *                       type: string
 *                       example: "List is not defined"
 *       500:
 *         description: Internal server error 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/List'
 */
