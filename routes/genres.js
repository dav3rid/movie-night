const genresRouter = require('express').Router();
const { handle405Errors } = require('../controllers/errors');
const { getGenres, postGenre, getGenreById } = require('../controllers/genres');

genresRouter.route('/').get(getGenres).post(postGenre).all(handle405Errors);
genresRouter.route('/:genre_id').get(getGenreById);

module.exports = genresRouter;
