const Router = require('express');
const ItemsController = require('../controllers/items-controller');

const router = new Router();

router.get('/cards', ItemsController.getItems);
router.get('/cards/filter', ItemsController.filterItems);
router.get('/cards/:id', ItemsController.getItem);
router.post('/cards', ItemsController.addItem);
router.put('/cards/:id', ItemsController.setNameItem);
router.put('/cards/complete/:id', ItemsController.setCompleted);
router.put('/cards/complete/all/:boolean', ItemsController.toggleCompleteAll);
router.delete('/cards/:id', ItemsController.deleteItem);
router.delete('/cards/', ItemsController.deleteAll);
router.delete('/cards/complete/all', ItemsController.deleteComplete);

module.exports = router;
