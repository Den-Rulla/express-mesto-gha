const signUpRouter = require('express').Router();

const { createUser } = require('../controllers/users');
const { validateSignUp } = require('../middlewares/userValidator');

signUpRouter.post('/signup', validateSignUp, createUser);

module.exports = signUpRouter;
