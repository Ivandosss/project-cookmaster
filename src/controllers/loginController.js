const status = require('http-status-codes').StatusCodes;
const { loginService } = require('../services/loginService');

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  let login;
  try {
    login = await loginService(email, password);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
  return (login.code) ? res.status(login.code).json({ message: login.message })
  : res.status(status.OK).json(login);
};

module.exports = {
  loginController,
};
