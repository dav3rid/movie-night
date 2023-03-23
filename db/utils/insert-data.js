const db = require('../connection');
const format = require('pg-format');

exports.insertGenres = async (genres) => {
  const pgFormattedGenres = genres.map(({ genre }) => {
    return [genre];
  });
  const insertGenresQueryString = format(
    `
    INSERT INTO genres
    (genre)
    VALUES
    %L
    RETURNING *;
  `,
    pgFormattedGenres
  );
  const { rows: insertedGenres } = await db.query(insertGenresQueryString);
  return insertedGenres;
};

exports.insertMovies = async (movies) => {
  const pgFormattedMovies = movies.map(
    ({ title, genre_id, runtime, director, certificate }) => {
      return [title, genre_id, runtime, director, certificate];
    }
  );
  const insertMoviesQueryString = format(
    `
    INSERT INTO movies
    (title, genre_id, runtime, director, certificate)
    VALUES
    %L;
  `,
    pgFormattedMovies
  );
  await db.query(insertMoviesQueryString);
};
