const connection = require('./connection');

const userCreateModels = async (body) => {
  try {
    const db = await connection();
    const create = await db.collection('users').insertOne(body);
    
    return create ? create.ops.pop() : null; 
  } catch (error) {
    return error.message;
  }
};

const userByEmailModel = async (email) => {
  try {
    const db = await connection();
    const user = await db.collection('users').findOne({ email });
    
    return user; 
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  userCreateModels,
  userByEmailModel,
};