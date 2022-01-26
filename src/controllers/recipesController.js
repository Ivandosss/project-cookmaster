const status = require('http-status-codes').StatusCodes;
const { 
  recipesCreateService, 
  recipesSearchService, 
  recipesSearchByIdService, recipeUpdateService } = require('../services/recipesService');
const { notFoundRecipe } = require('../dicionario/messages');

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

const recipesSearchByIdController = async (req, res, next) => {
  const { id } = req.params;
  let recipe;
  try {
    recipe = await recipesSearchByIdService(id);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }

  return recipe.code
  ? res.status(status.NOT_FOUND).json({ message: notFoundRecipe })
  : res.status(status.OK).json(recipe);
};

const recipeUpdateController = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { body } = req;

  let recipe;
  try {
    recipe = await recipeUpdateService(id, _id, body);
  } catch (error) {
    console.error(error.message);
    return next(error);
  }

  return recipe.code
  ? res.status(status.NOT_FOUND).json({ message: notFoundRecipe })
  : res.status(status.OK).json(recipe);
};

module.exports = {
  recipesCreateController,
  recipesSearchController,
  recipesSearchByIdController,
  recipeUpdateController,
};
