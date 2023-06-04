const router = require('express').Router();
/* const { celebrate, Joi } = require('celebrate');

const LINK = require('../utils/constants'); */

const {
  getUser,
  userUpdate,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', userUpdate);

module.exports = router;
