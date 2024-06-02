const errorHandle = (error, req, res, next) => {
  res
    .status(error.status || 500)
    .send({ message: error.message || "Internal Server Error" });
};

module.exports = errorHandle;
