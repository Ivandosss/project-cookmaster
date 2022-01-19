const router = require('express').Router();

const { createUserController } = require('../controllers/usersController');
const { checkUser, checkEmail } = require('../middlewares/userMeddlewares');

router.post(
  '/users',
  checkUser,
  checkEmail,
  createUserController,
);

module.exports = router;