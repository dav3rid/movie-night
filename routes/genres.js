const genresRouter = require('express').Router();
const { handle405Errors } = require('../controllers/errors');
const {
  getGenres,
  postGenre,
  getGenreById,
  patchGenreById
} = require('../controllers/genres');

genresRouter.route('/').get(getGenres).post(postGenre).all(handle405Errors);
genresRouter
  .route('/:genre_id')
  .get(getGenreById)
  .patch(patchGenreById)
  .all(handle405Errors);

module.exports = genresRouter;
