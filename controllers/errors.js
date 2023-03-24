exports.handleCustomRejectionErrors = (err, req, res, next) => {
  const { status, msg } = err;
  if (status && msg) {
    res.status(status).send({ msg });
  } else next(err);
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err, '<<< err');
  res.status(500).send({ msg: 'server error' });
};
