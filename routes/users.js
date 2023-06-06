const router = require('express').Router();

const {
  getUser,
  userUpdate,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', userUpdate);

module.exports = router;
