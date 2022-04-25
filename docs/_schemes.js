/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - isCompleted
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the item
 *         name:
 *           type: string
 *           description: Text of a task
 *         isCompleted:
 *           type: boolean
 *           description: The item completion state
 *         parentId:
 *           type: integer
 *           description: Id of a parent item
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
 *            * 31 - undefined-item
 *            * 32 - incorrect-property
 *            * 33 - parent-not-found
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
