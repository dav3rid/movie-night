const genresRouter = require('express').Router();
const { handle405Errors } = require('../controllers/errors');
const { getGenres, postGenre } = require('../controllers/genres');

genresRouter.route('/').get(getGenres).post(postGenre).all(handle405Errors);

module.exports = genresRouter;
