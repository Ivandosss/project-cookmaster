const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const router = require('../routers');

const app = express();

app.use(express.json());
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

app.use(router);
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

module.exports = app;
