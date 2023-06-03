const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    /* required: true, */
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    /* validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    }, */
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, {
  versionKey: false,
  statics: {
    findUserByCredentials(email, password) {
      return this.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            /* throw new AuthError('Неправильная почта или пароль'); */
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                /* throw new AuthError('Неправильная почта или пароль'); */
              }
              return user;
            });
        });
    },
  },
});

module.exports = mongoose.model('user', userSchema);
