const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  OK_CODE,
  CREATED_CODE,
} = require('../utils/constants');
const NotFoundErr = require('../errors/NotFoundErr');
const BadRequestErr = require('../errors/BadRequestErr');
const ConflictErr = require('../errors/ConflictErr');

// const { NODE_ENV, JWT_SECRET } = process.env;

const getAllUsers = (req, res, next) => User.find({})
  .then((users) => res.status(OK_CODE).send(users))
  .catch(next);

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((newUser) => res.status(CREATED_CODE).send(newUser))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new ConflictErr('The user with this email is already registered'));
          }
          if (err.name === 'ValidationError') {
            return next(new BadRequestErr('Bad request. Incorrect data'));
          }
          return next(err);
        });
    });
};

const getUserById = (req, res, next) => {
  const { userId } = req.params;

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('User not found');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestErr('Bad request'));
      }
      return next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('User not found');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch(next);
};

// const getCurrentUser = (req, res, next) => {
//   User.findById(req.user._id)
//     .then((user) => {
//       if (!user) {
//         throw new NotFoundErr('Пользователь с указанным _id не найден');
//       }
//       res.send({ data: user });
//     })
//     .catch(next);
// };

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('User not found');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Bad request. Incorrect data'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('User not found');
      }
      return res.status(OK_CODE).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestErr('Bad request. Incorrect data'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(next);
};

// const login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findUserByCredentials(email, password);

//     const token = jwt.sign(
//       { _id: user._id },
//       NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//       { expiresIn: '7d' },
//     );

//     res.cookie('token', token, {
//       maxAge: 3600000,
//       httpOnly: true,
//       sameSite: true,
//     }).send({ token });
//   } catch (err) {
//     next(err);
//   }
// };

// const login = (req, res, next) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       // создадим токен
//       const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
//       // вернём токен
//       res.send({ token });
//     })
//     .catch(next);
// };

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  getCurrentUser,
  updateUser,
  updateAvatar,
  login,
};
