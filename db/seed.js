const { insertGenres, insertMovies } = require('./utils/insert-data');
const { dropTables, createTables } = require('./utils/manage-tables');
const { createRefObj, formatData } = require('./utils/utils');

const seed = async ({ genres, movies }) => {
  await dropTables();
  await createTables();

  const insertedGenres = await insertGenres(genres);
  const genreRef = createRefObj(insertedGenres, 'genre', 'genre_id');
  const formattedMovies = formatData(genreRef, movies, 'genre_id', 'genre');
  await insertMovies(formattedMovies);
};

module.exports = seed;
