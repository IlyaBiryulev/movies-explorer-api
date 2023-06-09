const {
  DocumentNotFoundError,
} = require('mongoose').Error;

const Movie = require('../models/movie');

const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundErrors');
const {
  CREATE_CODE,
  NOT_FOUND_DATA,
  BAD_REQUEST_DATA_FILM,
  FORBIDDEN_ERROR_DELETE_FILM,
  NOT_FOUND_ID_FILM,
  FILM_DELETE,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError(NOT_FOUND_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: ownerId,
  })
    .then((movie) => res.status(CREATE_CODE).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(BAD_REQUEST_DATA_FILM));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie.deleteOne()
          .then(() => res.send({ message: FILM_DELETE }))
          .catch((err) => next(err));
      } else {
        throw new ForbiddenError(FORBIDDEN_ERROR_DELETE_FILM);
      }
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(NOT_FOUND_ID_FILM));
      } else {
        next(err);
      }
    });
};
