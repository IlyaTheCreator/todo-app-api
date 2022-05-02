/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns the list of all root items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of all root items with parentId = 0 (may be empty)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Throw out the trash
 *                   isCompleted:
 *                     type: boolean
 *                     example: false
 *                   parentId:
 *                     type: integer
 *                     example: 0
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */

/**
 * @swagger
 * /api/items/all:
 *   get:
 *     summary: Returns the list of all the items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of all the items (may be empty)
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
 *     summary: Returns single item by its ID with all its first children
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Existing item ID
 *     responses:
 *       200:
 *         description: |
 *           The found item with all its first children items.<br>
 *           The "children" property of the item contains an array of
 *           all the first children items of the current item.<br>
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: Tuesday
 *                       isCompleted:
 *                         type: boolean
 *                         example: false
 *                       parentId:
 *                         type: integer
 *                         example: 1
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
 *     summary: Toggles "isCompleted" property of the current item and all its children by the item's ID
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
 *           The item updated successfully.<br>
 *           The "id" property of the response object is an object which contains
 *           the "current" property with the ID of the current updated item,
 *           and the "children" property with an array of all its also updated children items
 *           which had the same "isCompleted" property value as the current item.<br>
 *           Each updated child object has its own "current" property with its ID,
 *           and its own "childrenAllNested" property as an array with IDs of all its also updated children items on all levels of nesting.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: object
 *                   properties:
 *                     current:
 *                       type: integer
 *                       example: 1
 *                     children:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           current:
 *                             type: integer
 *                             example: 2
 *                           childrenAllNested:
 *                             type: array
 *                             items:
 *                               type: integer
 *                             example: [5, 6, 9]
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
 * /api/items/{id}/complete/{boolean}:
 *   put:
 *     summary: Sets the "isComplete" property of the current item and all its children equal to the "boolean" parameter.
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
 *         description: |
 *           All item updated successfully.<br>
 *           The "id" property of the response object is an object which contains
 *           the "current" property with the ID of the current updated item,
 *           and the "children" property with an array of all its also updated children items
 *           whose "isCompleted" property value is opposite to the given boolean parameter.<br>
 *           Each updated child object has its own "current" property with its ID,
 *           and its own "childrenAllNested" property as an array with IDs of all its also updated children items on all levels of nesting.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: object
 *                   properties:
 *                     current:
 *                       type: integer
 *                       example: 1
 *                     children:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           current:
 *                             type: integer
 *                             example: 2
 *                           childrenAllNested:
 *                             type: array
 *                             items:
 *                               type: integer
 *                             example: [5, 6, 9]
 *                 message: 
 *                   type: string
 *                   example: "All items updated"
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
 *         description: |
 *           The item deleted successfully.<br>
 *           The "id" property of the response object is an object which contains
 *           the "current" property with the ID of the current deleted item,
 *           and the "children" property with an array of all its also deleted children items.<br>
 *           Each deleted child object has its own "current" property with its ID,
 *           and its own "childrenAllNested" property as an array with IDs of all its also deleted children items on all levels of nesting.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: object
 *                   properties:
 *                     current:
 *                       type: integer
 *                       example: 1
 *                     children:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           current:
 *                             type: integer
 *                             example: 2
 *                           childrenAllNested:
 *                             type: array
 *                             items:
 *                               type: integer
 *                             example: [5, 6, 9]
 *                 message: 
 *                   type: string
 *                   example: "Completed items deleted"
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
 *   delete:
 *     summary: Deletes all completed items
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
 *         description: |
 *           Completed items deleted successfully.<br>
 *           The "id" property of the response object is an object which contains
 *           the "current" property with the ID of the current modified item,
 *           and the "children" property with an array of deleted items which had been completed.<br>
 *           Each deleted child object has its own "current" property with its ID,
 *           and its own "childrenAllNested" property as an array with IDs of all its also deleted children items on all levels of nesting.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: 
 *                   type: object
 *                   properties:
 *                     current:
 *                       type: integer
 *                       example: 1
 *                     children:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           current:
 *                             type: integer
 *                             example: 2
 *                           childrenAllNested:
 *                             type: array
 *                             items:
 *                               type: integer
 *                             example: [5, 6, 9]
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
