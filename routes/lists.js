const Router = require('express');
const listController = require('../controllers/listController');

const router = new Router();

router.post('/lists', listController.addList);
router.get('/lists', listController.getLists);
router.delete('/lists/:id', listController.deleteList);
router.delete('/lists', listController.deleteAll);
router.put('/lists/:id', listController.setNameList);
router.get('/lists/:id', listController.getList);

module.exports = router;
