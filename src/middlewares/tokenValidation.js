const status = require('http-status-codes').StatusCodes;
const jwt = require('jsonwebtoken');
const { notFoundToken, infoToken } = require('../dicionario/messages');
const errors = require('../funcoes/index');

const secret = 'secret';

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  const { code, message } = errors(status.UNAUTHORIZED, notFoundToken);

  if (!token) return res.status(code).json({ message });

  try {
    const { data } = jwt.verify(token, secret);
    req.user = data;
    console.log(data);
    return next();
  } catch (error) {
    res.status(status.UNAUTHORIZED).json({ message: infoToken });
    console.log('OK');
    return next(error);
  }
};

module.exports = {
  tokenValidation,
};