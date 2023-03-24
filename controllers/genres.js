const { selectGenres, insertGenre } = require('../models/genres');

exports.getGenres = async (req, res, next) => {
  const { order } = req.query;
  try {
    const genres = await selectGenres(order);
    res.status(200).send({ genres });
  } catch (err) {
    next(err);
  }
};

exports.postGenre = async (req, res, next) => {
  try {
    const genre = await insertGenre(req.body);
    res.status(201).send({ genre });
  } catch (err) {
    next(err);
  }
};
