/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - name
 *         - isCompleted
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the card
 *         name:
 *           type: string
 *           description: Text of a task
 *         isCompleted:
 *           type: boolean
 *           description: The card completion state
 *         parentId:
 *           type: integer
 *           description: Id of a parent card
 *       example:
 *         id: 3
 *         name: Throw out the trash
 *         isCompleted: false
 *         parentId: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: integer
 *           description: |
 *            Custom error type. Possible values are:
 *            * 11 - empty-field
 *            * 21 - incorrect-type
 *            * 22 - not-string-type
 *            * 23 - not-number-type
 *            * 31 - undefined-property
 *            * 32 - undefined-card
 *            * 33 - incorrect-property
 *            * 34 - parent-not-found
 *         name:
 *           type: string
 *           description: Name of an error
 *         message:
 *           type: string
 *           description: Text of an error
 *       example:
 *         statusCode: 4
 *         name: not-number-type
 *         message: The value of IsCompleted can be either true(1) or false(0)
 */
