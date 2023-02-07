const errorHandler = (err, req, res, next) => {
  // log for developer
  console.log(JSON.stringify(err));

  const error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    error.statusCode = 404;
    error.message = `Resource not found with id: ${err.value}`;
  }

  // duplication error
  if (err.code === 11000) {
    error.statusCode = 400;
    error.message = `Duplicate value at: ${JSON.stringify(err.keyValue)}`;
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Internal server error." });
};

module.exports = errorHandler;
