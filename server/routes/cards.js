const Router = require('express');
const cardController = require('../controllers/cardController');

const router = new Router();

router.get('/cards', cardController.getCards);
router.get('/cards/filter', cardController.filterCards);
router.get('/cards/multifilter', cardController.multiFilterCards);
router.get('/cards/:id', cardController.getCard);
router.post('/cards', cardController.addCard);
router.put('/cards/:id', cardController.setNameCard);
router.put('/cards/complete/:id', cardController.setCompleted);
router.delete('/cards/:id', cardController.deleteCard);

module.exports = router;
