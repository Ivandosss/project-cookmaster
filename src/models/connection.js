const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_NAME = 'Cookmaster';
const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/${DB_NAME}`;
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connection = async () => MongoClient.connect(MONGO_DB_URL, OPTIONS)
.then((connect) => connect.db(DB_NAME))
.catch((err) => {
  console.error(err);
  process.exit();
});

module.exports = connection;
