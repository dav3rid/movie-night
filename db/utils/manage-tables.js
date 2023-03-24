const db = require('../connection');

exports.dropTables = async () => {
  const tableNames = ['movies', 'directors', 'genres', 'certificates'];
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

const createCertificatesTable = async () => {
  await db.query(`
    CREATE TABLE certificates (
      certificate_id SERIAL PRIMARY KEY,
      certificate VARCHAR(2) NOT NULL
    );
  `);
};

const createDirectorsTable = async () => {
  await db.query(`
    CREATE TABLE directors (
      director_id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
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
      director_id INT REFERENCES directors(director_id) NOT NULL,
      certificate_id INT REFERENCES certificates(certificate_id) NOT NULL
    );
  `);
};

exports.createTables = async () => {
  await Promise.all([
    createGenresTable(),
    createCertificatesTable(),
    createDirectorsTable()
  ]);
  await createMoviesTable();
};
