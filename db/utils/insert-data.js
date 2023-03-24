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

exports.insertCertificates = async (certificates) => {
  const pgFormattedCertificates = certificates.map(({ certificate }) => {
    return [certificate];
  });
  const insertCertificatesQueryString = format(
    `
    INSERT INTO certificates
    (certificate)
    VALUES
    %L
    RETURNING *;
  `,
    pgFormattedCertificates
  );

  const { rows: insertedCertificates } = await db.query(
    insertCertificatesQueryString
  );
  return insertedCertificates;
};

exports.insertDirectors = async (directors) => {
  const pgFormattedDirectors = directors.map(({ name }) => {
    return [name];
  });
  const insertDirectorsQueryString = format(
    `
    INSERT INTO directors
    (name)
    VALUES
    %L
    RETURNING *;
  `,
    pgFormattedDirectors
  );

  const { rows: insertedDirectors } = await db.query(
    insertDirectorsQueryString
  );
  return insertedDirectors;
};

exports.insertMovies = async (movies) => {
  const pgFormattedMovies = movies.map(
    ({ title, genre_id, runtime, director_id, certificate_id }) => {
      return [title, genre_id, runtime, director_id, certificate_id];
    }
  );
  const insertMoviesQueryString = format(
    `
    INSERT INTO movies
    (title, genre_id, runtime, director_id, certificate_id)
    VALUES
    %L;
  `,
    pgFormattedMovies
  );
  await db.query(insertMoviesQueryString);
};
