const router = require('express').Router();

const { loginController } = require('../controllers/loginController');
const { createUserController } = require('../controllers/usersController');

router.post(
  '/users',
  createUserController,
);

router.post(
  '/login',
  loginController,
);

module.exports = router;