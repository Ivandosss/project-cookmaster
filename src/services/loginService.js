const jwt = require('jsonwebtoken');
const status = require('http-status-codes').StatusCodes;
const { fieldsRequired, incorrectEntries } = require('../dicionario/messages');
const { userByEmailModel } = require('../models/usersModels');
const errors = require('../funcoes');
const { requiredSchema, formatSchema } = require('./joi'); 

const secret = 'secret';
const config = { expiresIn: '7d', algorithm: 'HS256' };

const loginService = async (email, password) => {
  const { error } = requiredSchema.validate({ email, password });
  if (error) return errors(status.UNAUTHORIZED, fieldsRequired);

  const format = formatSchema.validate({ email, password });
  const user = await userByEmailModel(email);

  if (format.error || !user || user.password !== password) {
    return errors(status.UNAUTHORIZED, incorrectEntries);
  }
  const { 
    password: passBD,
    ...userWithoutPassword 
  } = user;

  const token = jwt.sign({ data: userWithoutPassword }, secret, config);
  return { token };
};

module.exports = {
  loginService,
};