const status = require('http-status-codes').StatusCodes;
const { invalidEntries } = require('../dicionario/messages');
const errors = require('../funcoes');
const { recipeSchema } = require('./joi');
const { recipesCreateModel } = require('../models/recipesCreateModel');

const recipesCreateService = async (body) => {
  const { name, ingredients, preparation } = body;
  const { error } = recipeSchema.validate({ name, ingredients, preparation });

  if (error) return errors(status.BAD_REQUEST, invalidEntries);

  const id = await recipesCreateModel(body);

  return { recipe: { _id: id, ...body } };
};

module.exports = {
  recipesCreateService,
};