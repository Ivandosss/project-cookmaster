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

module.exports = {
  recipesCreateModel,
  recipesSearchModel,
};