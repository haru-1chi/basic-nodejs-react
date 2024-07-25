const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};

module.exports = { notFoundHandler, errorHandler };