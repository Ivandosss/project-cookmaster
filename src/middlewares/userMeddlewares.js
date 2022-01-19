const { userByEmailService } = require('../services/userService');

const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/i;

  if (!email || !regex.test(email)) {
 return res.status(400)
  .json({ message: 'Invalid entries. Try again.' }); 
}
next();
};

const checkUser = async (req, res, next) => {
  const { name, password, email } = req.body;

  if (!name || !password) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  const user = await userByEmailService(email);

  if (user) return res.status(409).json({ message: 'Email already registered' });

  next();
};

module.exports = {
  checkEmail,
  checkUser,
};