const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NOT_FOUND_ERROR } = require('../utils/errors');

router.use(usersRouter);
router.use(cardsRouter);

router.use('*', (req, res) => res.status(NOT_FOUND_ERROR).send({ message: 'Page Not Found' }));

module.exports = router;
