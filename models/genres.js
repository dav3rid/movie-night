const db = require('../db/connection');

exports.selectGenres = async (order = 'asc') => {
  const validOrders = ['asc', 'desc'];
  if (!validOrders.includes(order.toLowerCase())) {
    return Promise.reject({ status: 400, msg: 'bad request' });
  }

  const { rows: genres } = await db.query(`
  SELECT * FROM genres
  ORDER BY genre ${order};
  `);
  return genres;
};

exports.insertGenre = async ({ genre }) => {
  const {
    rows: [insertedGenre]
  } = await db.query(
    `
  INSERT INTO genres
  (genre)
  VALUES
  ($1)
  RETURNING *;
  `,
    [genre]
  );
  return insertedGenre;
};

exports.selectGenreById = async (genre_id) => {
  const {
    rows: [genre]
  } = await db.query(
    `
  SELECT * FROM genres
  WHERE genre_id = $1
  LIMIT 1;
  `,
    [genre_id]
  );
  if (!genre) {
    return Promise.reject({ status: 404, msg: 'genre not found' });
  }
  return genre;
};
