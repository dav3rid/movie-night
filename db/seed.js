const {
  insertGenres,
  insertCertificates,
  insertDirectors,
  insertMovies
} = require('./utils/insert-data');
const { dropTables, createTables } = require('./utils/manage-tables');
const { createRefObj, formatData } = require('./utils/utils');

const seed = async ({ genres, certificates, directors, movies }) => {
  await dropTables();
  await createTables();

  const [insertedGenres, insertedCertificates, insertedDirectors] =
    await Promise.all([
      insertGenres(genres),
      insertCertificates(certificates),
      insertDirectors(directors)
    ]);

  const genreRef = createRefObj(insertedGenres, 'genre', 'genre_id');
  const certificateRef = createRefObj(
    insertedCertificates,
    'certificate',
    'certificate_id'
  );
  const directorRef = createRefObj(insertedDirectors, 'name', 'director_id');

  const formattedMovies = formatData(movies, [
    [genreRef, 'genre_id', 'genre'],
    [certificateRef, 'certificate_id', 'certificate'],
    [directorRef, 'director_id', 'director']
  ]);
  await insertMovies(formattedMovies);
};

module.exports = seed;
