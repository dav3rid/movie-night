const { selectCertificates } = require('../models/certificates');

exports.getCertificates = async (req, res, next) => {
  try {
    const certificates = await selectCertificates();
    res.status(200).send({ certificates });
  } catch (err) {
    next(err);
  }
};
