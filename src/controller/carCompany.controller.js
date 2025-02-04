const CarCompany = require("../models/carsCompany");
const getCarCompany = async (req, res, next) => {
  try {
    const company = await CarCompany.find();

    res.json(company);
  } catch (error) {
    next(error);
  }
};

const createCarCompany = async (req, res, next) => {
  try {
    const company = req.body;
    await CarCompany.create(company);
    res.json(company);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCarCompany,
  createCarCompany,
};
