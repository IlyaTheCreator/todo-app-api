/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns the list of all the items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of the items (can be empty)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items/filter:
 *   get:
 *     summary: Returns the list of all the items that match specified query
 *     tags: [Items]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Items' "name" value to filter
 *       - in: query
 *         name: isCompleted
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Items' "isCompleted" value to filter
 *       - in: query
 *         name: parentId
 *         schema:
 *           type: integer
 *         required: false
 *         description: Items' "parentId" value to filter
 *     responses:
 *       200:
 *         description: The list of the filtered items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
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
 * /api/items/{id}:
 *   get:
 *     summary: Returns single item by its id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Existing item id
 *     responses:
 *       200:
 *         description: found item with all its children items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Monday
 *                 isCompleted:
 *                   type: boolean
 *                   example: false
 *                 parentId:
 *                   type: integer
 *                   example: 0
 *                 children:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Adds new item
 *     tags: [Items]
 *     requestBody:
 *       description: Task to be created.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parentId:
 *                 type: integer
 *             example:
 *               name: Item 1
 *               parentId: 0
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   example: 1
 *                 message: 
 *                   type: string
 *                   example: "Item added"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Sets a name of a item
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: A parameter by which a item name will be edited
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
 *         description: The item was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   example: 1
 *                 message: 
 *                   type: string
 *                   example: "Item updated"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items/{id}/complete:
 *   put:
 *     summary: Edits existing item's isCompleted property by its id
 *     tags: [Items]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: A parameter by which a item will be edited
 *     responses:
 *       200:
 *         description: |
 *           The item was updated successfully.
 *           The "id" of the response object is an array in which the first element is an ID of modified item
 *           and the rest elements are IDs of all its children items.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: array
 *                   items:
 *                     type: integer
 *                   example: [1, 4, 5]
 *                 message: 
 *                   type: string
 *                   example: "Item updated"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Deletes single item by its id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Existing item id
 *     responses:
 *       200:
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: integer
 *                   example: 1
 *                 message: 
 *                   type: string
 *                   example: "Item deleted"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items:
 *   delete:
 *     summary: Deletes all items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Items deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: "All items deleted"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items/{id}/complete/{boolean}:
 *   put:
 *     summary: Marks all items completed/uncompleted
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Existing item id
 *       - in: path
 *         name: boolean
 *         schema:
 *           type: boolean
 *         required: true
 *         description: The "isCompleted" value to set to all items at once
 *     responses:
 *       200:
 *         description: All items updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All items updated
 *       400:
 *         description: Incorrectly property 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items/complete/all:
 *   delete:
 *     summary: Deletes all completed items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: Completed items deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: "Completed items deleted"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
