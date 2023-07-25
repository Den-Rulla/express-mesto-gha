const signinRouter = require('express').Router();

const { login } = require('../controllers/users');
// const { validateSignin } = require('../middlewares/userValidator');

signinRouter.post('/signin', login);

module.exports = signinRouter;
