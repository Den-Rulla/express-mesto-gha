const cardsRouter = require('express').Router();

const { validateCard, validateCardId } = require('../middlewares/cardValidator');

const {
  getAllCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', validateCard, createCard);
cardsRouter.delete('/cards/:cardId', validateCardId, deleteCard);
cardsRouter.put('/cards/:cardId/likes', validateCardId, putLikeCard);
cardsRouter.delete('/cards/:cardId/likes', validateCardId, deleteLikeCard);

module.exports = cardsRouter;
