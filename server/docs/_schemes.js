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