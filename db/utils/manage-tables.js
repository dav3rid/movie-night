const db = require('../connection');

exports.dropTables = async () => {
  const tableNames = ['movies', 'genres'];
  await db.query(`DROP TABLE IF EXISTS ${tableNames.join()}`);
};

const createGenresTable = async () => {
  await db.query(`
    CREATE TABLE genres (
      genre_id SERIAL PRIMARY KEY,
      genre VARCHAR(50) NOT NULL
    );
  `);
};

const createMoviesTable = async () => {
  await db.query(`
    CREATE TABLE movies (
      movie_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      genre_id INT REFERENCES genres(genre_id) NOT NULL,
      runtime INT NOT NULL,
      director VARCHAR(100) NOT NULL,
      certificate VARCHAR(2) NOT NULL
    );
  `);
};

exports.createTables = async () => {
  await createGenresTable();
  await createMoviesTable();
};
