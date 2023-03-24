const genresRouter = require('./genres');
const apiRouter = require('express').Router();

apiRouter.use('/genres', genresRouter);

module.exports = apiRouter;
