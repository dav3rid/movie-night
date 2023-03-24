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
