const Router = require('express');
const listController = require('../controllers/listController');
const cardController = require('../controllers/cardController');

const router = new Router();

//routes for Сard
router.post('/card', cardController.addCard);
router.get('/cards', cardController.getCards);
router.get('/cards/filter', cardController.filterCards);
router.get('/card/:id', cardController.getCard);
router.put('/card/:id', cardController.setNameCard);
router.put('/card/complete/:id', cardController.setCompleted);
router.delete('/card/:id', cardController.deleteCard);

//routes for List
router.post('/list', listController.addList);
router.get('/lists', listController.getLists);
router.delete('/list/:id', listController.deleteList);
router.put('/list/:id', listController.setNameList);

module.exports = router;