const Router = require('express');
const ItemsController = require('../controllers/items-controller');

const router = new Router();

router.get('/items', ItemsController.getItems);
router.get('/items/filter', ItemsController.filterItems);
router.get('/items/:id', ItemsController.getItem);
router.post('/items', ItemsController.addItem);
router.put('/items/:id', ItemsController.setNameItem);
router.put('/items/complete/:id', ItemsController.setCompleted);
router.put('/items/complete/all/:boolean', ItemsController.toggleCompleteAll);
router.delete('/items/:id', ItemsController.deleteItem);
router.delete('/items/', ItemsController.deleteAll);
router.delete('/items/complete/all', ItemsController.deleteComplete);

module.exports = router;
