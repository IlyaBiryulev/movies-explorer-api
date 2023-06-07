const mongoose = require('mongoose');

const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, ' Необходимо указать страна создания фильма'],
  },
  director: {
    type: String,
    required: [true, 'Необходимо указать режиссёр фильма'],
  },
  duration: {
    type: String,
    required: [true, 'Необходимо указать продолжительность фильма'],
  },
  year: {
    type: Number,
    required: [true, 'Необходимо указать год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Необходимо указать описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Необходимо указать ссылку на постер фильма'],
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Необходимо указать ссылку на трейлер фильма'],
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Необходимо указать ссылку на мини-постер'],
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Необходимо указать владельца фильма'],
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: [true, 'Необходимо указать ID фильма'],
    ref: 'user',
  },
  nameRU: {
    type: String,
    required: [true, 'Необходимо указать название фильма на русском'],
  },
  nameEN: {
    type: String,
    required: [true, 'Необходимо указать название фильма на английском'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
