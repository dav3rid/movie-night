const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err, '<<< err');
  res.status(500).send({ msg: 'server error' });
});

module.exports = app;