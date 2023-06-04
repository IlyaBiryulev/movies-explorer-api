const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const userRoute = require('./users');
const movieRouter = require('./movies');
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const { notFound } = require('../controllers/notFound');
const auth = require('../middlewares/auth');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signInRouter);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), signUpRouter);

router.use('/users', auth, userRoute);
router.use('/cards', auth, movieRouter);
router.use('*', auth, notFound);

module.exports = router;
