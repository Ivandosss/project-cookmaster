const { userByEmailModel, userCreateModels } = require('../models/usersModels');

const userCreateService = async (body) => {
  const create = await userCreateModels(body);
  return create;
};

const userByEmailService = async (email) => {
  const user = await userByEmailModel(email);
  return user;
};

module.exports = {
  userCreateService,
  userByEmailService,
};