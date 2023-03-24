const { selectGenres } = require('../models/genres');

exports.getGenres = async (req, res, next) => {
  const { order } = req.query;
  try {
    const genres = await selectGenres(order);
    res.status(200).send({ genres });
  } catch (err) {
    next(err);
  }
};
