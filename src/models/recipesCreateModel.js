const connection = require('./connection');

const recipesCreateModel = async (body) => {
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne(body);

  return insertedId;
};

module.exports = {
  recipesCreateModel,
};