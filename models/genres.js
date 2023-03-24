const db = require('../db/connection');

exports.selectGenres = async () => {
  const { rows: genres } = await db.query('SELECT * FROM genres');
  return genres;
};
