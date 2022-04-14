const Router = require('express');
const cardController = require('../controllers/cardController');

const router = new Router();

router.post('/card', cardController.addCard);
router.get('/cards', cardController.getCards);
router.get('/cards/filter', cardController.filterCards);
router.get('/card/:id', cardController.getCard);
router.put('/card/:id', cardController.setNameCard);
router.put('/card/complete/:id', cardController.setCompleted);
router.delete('/card/:id', cardController.deleteCard);

module.exports = router;
