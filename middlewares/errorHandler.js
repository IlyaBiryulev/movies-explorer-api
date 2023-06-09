const { DEFAULT_ERROR, DEFAULT_ERROR_MESSAGE } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || DEFAULT_ERROR;

  const message = statusCode === DEFAULT_ERROR ? DEFAULT_ERROR_MESSAGE : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
