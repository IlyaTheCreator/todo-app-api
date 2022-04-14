const Router = require('express');
const listController = require('../controllers/listController');

const router = new Router();

router.post('/list', listController.addList);
router.get('/lists', listController.getLists);
router.delete('/list/:id', listController.deleteList);
router.put('/list/:id', listController.setNameList);

module.exports = router;
