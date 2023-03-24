const { getCertificates } = require('../controllers/certificates');
const { handle405Errors } = require('../controllers/errors');

const certificatesRouter = require('express').Router();

certificatesRouter.route('/').get(getCertificates).all(handle405Errors);

module.exports = certificatesRouter;
