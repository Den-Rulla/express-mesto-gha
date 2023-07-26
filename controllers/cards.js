const Card = require('../models/card');
const {
  OK_CODE,
  CREATED_CODE,
} = require('../utils/constants');
const NotFoundErr = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const getAllCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(OK_CODE).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.status(CREATED_CODE).send(newCard))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Bad request. Incorrect data'));
      }
      return next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Card not found');
      }
      if (card.owner.toString() !== userId) {
        throw new ForbiddenErr('No rights to delete. You can only delete your cards');
      }
      return Card.deleteOne(card)
        .then(() => res.status(OK_CODE).send(card))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestErr('Bad request'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const putLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Card not found');
      }
      return res.status(OK_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Bad request'));
      }
      return next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Card not found');
      }
      return res.status(OK_CODE).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Bad request'));
      }
      return next(err);
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
