const cardsRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getAllCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCard);
cardsRouter.put('/cards/:cardId/likes', putLikeCard);
cardsRouter.delete('/cards/:cardId/likes', deleteLikeCard);

module.exports = cardsRouter;
