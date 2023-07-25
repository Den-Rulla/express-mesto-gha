const usersRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', getUserById);
usersRouter.patch('/users/me', updateUser);
usersRouter.patch('/users/me/avatar', updateAvatar);

module.exports = usersRouter;
