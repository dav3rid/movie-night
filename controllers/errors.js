exports.handle404Errors = (req, res, next) => {
  res.status(404).send({ msg: 'path not found' });
};

exports.handle405Errors = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};

exports.handleCustomRejectionErrors = (err, req, res, next) => {
  const { status, msg } = err;
  if (status && msg) {
    res.status(status).send({ msg });
  } else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const { code } = err;
  const badRequestCodes = ['23502'];
  if (badRequestCodes.includes(code)) {
    res.status(400).send({ msg: 'bad request' });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err, '<<< err');
  res.status(500).send({ msg: 'server error' });
};
