const express = require('express');
const {
  handleCustomRejectionErrors,
  handle500Errors
} = require('./controllers/errors');
const apiRouter = require('./routes/api');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({ msg: '👍' });
});

app.use('/api', apiRouter);

app.use(handleCustomRejectionErrors);
app.use(handle500Errors);

module.exports = app;
