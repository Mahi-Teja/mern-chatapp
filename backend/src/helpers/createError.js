const newError = (err, req, res, next) => {
  const error = {
    status: err.status,
    message: err.message,
  };
  next(error);
};

module.exports = newError;
