const Router = require('express');
const ItemsController = require('../controllers/items-controller');

const router = new Router();

router.get('/items/all', ItemsController.getAllItems);
router.get('/items/filter', ItemsController.filterItems);
router.get('/items/:id', ItemsController.getItem);
router.post('/items', ItemsController.addItem);
router.put('/items/:id', ItemsController.setItemName);
router.put('/items/:id/complete', ItemsController.toggleIsCompleted);
router.put('/items/:id/complete/:boolean', ItemsController.setIsCompletedAll);
router.delete('/items/', ItemsController.deleteAll);
router.delete('/items/:id', ItemsController.deleteItem);
router.delete('/items/:id/complete', ItemsController.deleteAllCompleted);

module.exports = router;
