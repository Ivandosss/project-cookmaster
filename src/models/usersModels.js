const connection = require('./connection');

const userCreateModels = async (name, email, password, role) => {
    const db = await connection();
    const { insertedId } = await db.collection('users').insertOne({ name, email, password, role });
    
    return insertedId;
};

const userByEmailModel = async (email) => {
    const db = await connection();
    const user = await db.collection('users').findOne({ email });
    
    return user;
};

module.exports = {
  userCreateModels,
  userByEmailModel,
};