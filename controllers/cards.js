/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */

const Card = require('../models/card');

const getAllCards = (req, res) => {
  return Card.find({})
    .then((cards) => {
      return res.status(200).send(cards);
    })
    .catch((err) => {
      return res.status(500).send({ message: 'Server Error' });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  return Card.create({ name, link, owner: req.user })
    .then((newCard) => {
      return res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: `${Object.values(err.errors)
            .map((err) => err.message)
            .join(', ')}`,
        });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findById(cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      if (card.owner.toString() !== userId) {
        return res.status(400).send({ message: 'No rights to delete. You can only delete your cards' });
      }
      return Card.deleteOne(card)
        .then((card) => res.status(200).send(card))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            return res.status(400).send({
              message: `${Object.values(err.errors)
                .map((err) => err.message)
                .join(', ')}`,
            });
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Bad request' });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
};

const putLikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(cardId, { $addToSet: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Bad request' });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
};

const deleteLikeCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  return Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Card not found' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Bad request' });
      }
      return res.status(500).send({ message: 'Server Error' });
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  putLikeCard,
  deleteLikeCard,
};
