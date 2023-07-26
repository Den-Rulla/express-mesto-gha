const signInRouter = require('express').Router();

const { login } = require('../controllers/users');
const { validateSignIn } = require('../middlewares/userValidator');

signInRouter.post('/signin', validateSignIn, login);

module.exports = signInRouter;
