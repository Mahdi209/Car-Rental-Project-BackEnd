const City = require("../models/city");

const getCity = async (req, res, next) => {
  try {
    const city = await City.find({});

    res.json(city);
  } catch (error) {
    next(error);
  }
};

const createCity = async (req, res, next) => {
  try {
    const name = req.body;
    const newCity = await City.create(name);

    res.json(newCity);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCity,
  createCity,
};
