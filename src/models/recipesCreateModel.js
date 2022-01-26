const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipesCreateModel = async (body) => {
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne(body);

  return insertedId;
};

const recipesSearchModel = async () => {
  try {
    const db = await connection();
    const recipes = await db.collection('recipes')
    .find().toArray();
    return recipes || null;
  } catch (error) {
    return error.message;
  }
};

const recipesSearchByIdModel = async (id) => {
  try {
    const db = await connection();
    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    
    return recipe || null;
  } catch (error) {
    return error.message;
  }
};

const recipeUpdateModel = async (id, recipe) => {
  try {
    const db = await connection();
    const updateRecipe = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { ...recipe } });
    
    return updateRecipe || null;
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  recipesCreateModel,
  recipesSearchModel,
  recipesSearchByIdModel,
  recipeUpdateModel,
};