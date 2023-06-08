const {
  DocumentNotFoundError,
} = require('mongoose').Error;

const Movie = require('../models/movie');

const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundErrors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail()
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Данные не найдены.'));
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
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при добавлении фильма.'));
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
        movie.remove()
          .then(() => res.send('Фильм удален'))
          .catch((err) => next(err));
      } else {
        throw new ForbiddenError('Невозможно удалить карточку созданную не вами');
      }
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError('Пользователь с указанным id не существует'));
      } else if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError('Несуществующий ID фильма'));
      } else {
        next(err);
      }
    });
};
