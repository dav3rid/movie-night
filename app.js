const express = require('express');
const {
  handle404Errors,
  handleCustomRejectionErrors,
  handlePsqlErrors,
  handle500Errors
} = require('./controllers/errors');
const apiRouter = require('./routes/api');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({ msg: '👍' });
});

app.use('/api', apiRouter);

app.use('/*', handle404Errors);

app.use(handleCustomRejectionErrors);
app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
