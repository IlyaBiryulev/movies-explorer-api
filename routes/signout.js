const router = require('express').Router();

const { logout } = require('../controllers/users');

router.delete('/', logout);

module.exports = router;
