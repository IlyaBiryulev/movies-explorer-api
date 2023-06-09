const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundErrors');
const {
  CREATE_CODE,
  NOT_FOUND_ID,
  BAD_REQUEST_UPDATE_USER,
  REPEAT_EMAIL_ERROR,
  BAD_REQUEST_CREATE_USER,
  SUCCESSFUL_SIGNIN,
  SUCCESSFUL_SIGNOUT,
} = require('../utils/constants');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError(NOT_FOUND_ID))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.userUpdate = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userId, { email, name }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(NOT_FOUND_ID))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(BAD_REQUEST_UPDATE_USER));
      } else if (err.code === 11000) {
        next(new ConflictError(REPEAT_EMAIL_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({ email, password: hash, name }))
    .then((user) => {
      const data = user.toObject();
      delete data.password;
      res.status(CREATE_CODE).send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(REPEAT_EMAIL_ERROR));
      } else if (err instanceof ValidationError) {
        next(new ValidationError(BAD_REQUEST_CREATE_USER));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ message: SUCCESSFUL_SIGNIN });
    })
    .catch(next);
};

module.exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: SUCCESSFUL_SIGNOUT });
};
