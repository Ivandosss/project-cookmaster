const { ObjectId } = require('mongodb');
const status = require('http-status-codes').StatusCodes;
const { invalidEntries, notFoundRecipe } = require('../dicionario/messages');
const errors = require('../funcoes');
const { recipeSchema } = require('./joi');
const { 
  recipesCreateModel, 
  recipesSearchModel, recipesSearchByIdModel } = require('../models/recipesCreateModel');

const recipesCreateService = async (body) => {
  const { name, ingredients, preparation } = body;
  const { error } = recipeSchema.validate({ name, ingredients, preparation });

  if (error) return errors(status.BAD_REQUEST, invalidEntries);

  const id = await recipesCreateModel(body);

  return { recipe: { _id: id, ...body } };
};

const recipesSearchService = async () => {
  const recipes = await recipesSearchModel();

  if (!recipes) return errors(status.NOT_FOUND, notFoundRecipe);

  return recipes;
};

const recipesSearchByIdService = async (id) => {
  if (!ObjectId.isValid(id)) return errors(status.NOT_FOUND, notFoundRecipe);

  const recipes = await recipesSearchByIdModel(id);
  return recipes;
};

module.exports = {
  recipesCreateService,
  recipesSearchService,
  recipesSearchByIdService,
};