const status = require('http-status-codes').StatusCodes;
const { recipesCreateService, recipesSearchService } = require('../services/recipesService');

const recipesCreateController = async (req, res, next) => {
  const { body } = req;
  const { name, ingredients, preparation } = body;
  const { _id } = req.user;
  let result; 
  try {
    result = await recipesCreateService({ name, ingredients, preparation, userId: _id }); 
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
  console.log(result);
  return !result.code ? res.status(status.CREATED).json(result)
  : res.status(status.BAD_REQUEST).json({ message: result.message });
};

const recipesSearchController = async (req, res, next) => {
  try {
    const recipes = await recipesSearchService();
    return res.status(status.OK).json(recipes);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }
};

module.exports = {
  recipesCreateController,
  recipesSearchController,
};
