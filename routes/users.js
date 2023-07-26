const usersRouter = require('express').Router();

const {
  validateUserUpdate,
  validateAvatarUpdate,
  validateUserId,
} = require('../middlewares/userValidator');

const {
  getAllUsers,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:userId', validateUserId, getUserById);
usersRouter.patch('/users/me', validateUserUpdate, updateUser);
usersRouter.patch('/users/me/avatar', validateAvatarUpdate, updateAvatar);

module.exports = usersRouter;
