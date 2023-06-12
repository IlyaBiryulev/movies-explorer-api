const router = require('express').Router();

const userRoute = require('./users');
const movieRouter = require('./movies');
const signUpRouter = require('./signup');
const signInRouter = require('./signin');
const signOutRouter = require('./signout');
const { notFound } = require('../controllers/notFound');
const auth = require('../middlewares/auth');

router.use('/signin', signInRouter);
router.use('/signup', signUpRouter);
router.use('/signout', auth, signOutRouter);
router.use('/users', auth, userRoute);
router.use('/movies', auth, movieRouter);
router.use('*', auth, notFound);

module.exports = router;
