const status = require('http-status-codes').StatusCodes;
const { userCreateService } = require('../services/userService');

const MESSAGE = { message: 'NOT FOUND' };

const createUserController = async (req, res) => {
  let create;
  
  try {
    create = await userCreateService(req.body);
  } catch (error) {
    return res.status(status.BAD_REQUEST).json({ message: 'connection error' });
  }
  delete create.password;
  return create 
  ? res.status(status.CREATED).json({ user: { ...create, role: 'user' } })
  : res.status(status.UNPROCESSABLE_ENTITY).json(MESSAGE);
};

module.exports = {
  createUserController,
};
