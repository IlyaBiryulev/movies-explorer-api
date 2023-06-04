const Movie = require('../models/movie');

/* const ForbiddenError = require('../errors/ForbiddenError'); */
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundErrors');

module.exports.getMovies = (req, res, next) => {
  Movie.findById({ owner: req.user._id })
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const ownerId = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
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

/* module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.cardId)
    .orFail(() => new NotFoundError('Пользователь с указанным id не существует'))
    .then((movie) => {
      Movie.deleteOne({ _id: movie._id, owner: req.user._id });
    })
    .catch(next);
}; */
