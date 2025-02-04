const notFound = (req, res) => {
  res.status(404).send("Oops, the page you're looking for doesn't exist.");
};

module.exports = notFound;
