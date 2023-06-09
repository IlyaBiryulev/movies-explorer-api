const NotFoundError = require('../errors/NotFoundErrors');
const { NOT_FOUND_URL } = require('../utils/constants');

module.exports.notFound = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_URL));
};
