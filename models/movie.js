const mongoose = require('mongoose');

const LINK = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (image) => LINK.test(image),
      message: 'Некорректная ссылка на постер',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (trailer) => LINK.test(trailer),
      message: 'Некорректная ссылка на трейлер',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (thumbnail) => LINK.test(thumbnail),
      message: 'Некорректная ссылка на постер',
    },
  },
  owner: {
    type: String,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: String,
    required: true,
    ref: 'user',
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
