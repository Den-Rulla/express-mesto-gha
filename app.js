/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/index');

const { PORT = 3000 } = process.env;

mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '64a38a038c145af778f288da',
  };

  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
