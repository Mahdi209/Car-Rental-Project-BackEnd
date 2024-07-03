const Car = require("../../models/car");

const getCar = async (req, res, next) => {
  try {
    const cars = await Car.find()
      .populate("carCompany", "name")
      .populate("carTypes", "name");
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

const getCarsByCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carByCompany = await Car.find({ carCompany: id });
    res.json(carByCompany);
  } catch (error) {
    next(error);
  }
};

const createCar = async (req, res, next) => {
  try {
    // console.log(req.body);
    const carInfo = {
      carCompany: req.body.company,
      carName: req.body.carName,
      carTypes: req.body.carTypes,
      engine: req.body.engine,
      seats: req.body.seats,
      Gear: req.body.Gear,
    };
    const newCar = await Car.create(carInfo);
    res.json(newCar);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCar,
  getCarsByCompany,
  createCar,
};
