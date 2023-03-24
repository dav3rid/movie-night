const genresRouter = require('express').Router();
const { getGenres } = require('../controllers/genres');

genresRouter.route('/').get(getGenres);

module.exports = genresRouter;
