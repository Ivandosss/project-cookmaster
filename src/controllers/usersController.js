const status = require('http-status-codes').StatusCodes;
const { userCreateService } = require('../services/userService');

const createUserController = async (req, res, next) => {
  const { name, password, email } = req.body;
  const { role } = req;
  let create;
  
  try {
    create = await userCreateService(name, email, password, role);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
  return create.code 
  ? res.status(create.code).json({ message: create.message })
  : res.status(status.CREATED).json(create);
};

module.exports = {
  createUserController,
};
