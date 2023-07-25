const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const NotFoundErr = require('../errors/NotFoundErr');

router.use(signinRouter);
router.use(signupRouter);
router.use(usersRouter);
router.use(cardsRouter);

router.use('*', (req, res, next) => { next(new NotFoundErr('Page not found')); });

module.exports = router;
