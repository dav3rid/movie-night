const certificatesRouter = require('./certificates');
const genresRouter = require('./genres');
const apiRouter = require('express').Router();

apiRouter.use('/genres', genresRouter);
apiRouter.use('/certificates', certificatesRouter);

module.exports = apiRouter;
