const status = require('http-status-codes').StatusCodes;
const { invalidEntries, alreadyRegistered } = require('../dicionario/messages');
const errors = require('../funcoes');
const { userByEmailModel, userCreateModels } = require('../models/usersModels');
const { userSchema } = require('./joi');

const userCreateService = async (name, email, password, userRole) => {
  const { error } = userSchema.validate({ name, email, password });
  if (error) return errors(status.BAD_REQUEST, invalidEntries);
  
  const getEmail = await userByEmailModel(email);
  if (getEmail) return errors(status.CONFLICT, alreadyRegistered);
  console.log(getEmail);
  const role = userRole ? 'admin' : 'user'; 
  const id = await userCreateModels(name, email, password, role);
  return { user: { _id: id, name, email, role } };
};

const userByEmailService = async (email) => {
  const user = await userByEmailModel(email);
  return user;
};

module.exports = {
  userCreateService,
  userByEmailService,
};