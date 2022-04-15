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
 *            * 1 - undefined-property
 *            * 2 - list-name-exist
 *            * 3 - not-string-type
 *            * 4 - not-number-type
 *            * 5 - incorrect-type
 *            * 6 - undefined-card
 *            * 7 - empty-field
 *            * 8 - undefined-list
 *            * 9 - no-such-entity
 *         message:
 *           type: string
 *           description: Text of an error
 *       example:
 *         statusCode: 4
 *         message: The value of IsCompleted can be either true(1) or false(0)
 */
