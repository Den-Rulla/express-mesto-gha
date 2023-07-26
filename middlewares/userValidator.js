const { Joi, celebrate } = require('celebrate');
const { regExpUrl } = require('../utils/constants');

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regExpUrl),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const validateSignup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regExpUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  validateSignup,
  validateSignin,
  validateUserUpdate,
  validateAvatarUpdate,
  validateUserId,
};
