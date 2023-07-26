const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signInRouter = require('./signIn');
const signUpRouter = require('./signUp');
const auth = require('../middlewares/auth');
const NotFoundErr = require('../errors/NotFoundErr');

router.use(signInRouter);
router.use(signUpRouter);

router.use(auth);

router.use(usersRouter);
router.use(cardsRouter);

router.use('*', () => {
  throw new NotFoundErr('Page Not Found');
});

module.exports = router;
