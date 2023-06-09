const jwt = require('jsonwebtoken');

const AuthError = require('../errors/AuthError');
const { NEED_AUTH } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new AuthError(NEED_AUTH));
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret-key');
  } catch (err) {
    return next(new AuthError(NEED_AUTH));
  }
  req.user = payload;
  return next();
};
