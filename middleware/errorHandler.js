const errorHandler = (err, req, res, next) => {
  // log for developer
  console.log(JSON.stringify(err));

  const error = { ...err };

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Internal server error." });
};

module.exports = errorHandler;
