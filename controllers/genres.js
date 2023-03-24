const { selectGenres } = require('../models/genres');

exports.getGenres = async (req, res, next) => {
  try {
    const genres = await selectGenres();
    res.status(200).send({ genres });
  } catch (err) {
    next(err);
  }
};
