const CarDetails = require("../../models/CarDetails");

const getCar = async (req, res, next) => {
  try {
    const cars = await CarDetails.find()
      .populate("car", "carName")
      .populate("company", "fullName");
    res.json(cars);
  } catch (error) {
    next(error);
  }
};
const getSingleCar = async (req, res, next) => {
  try {
    const CarId = req.params.id;
    const cars = await CarDetails.find({ _id: CarId })
      .populate({
        path: "car",
        select: "carName engine seats Gear",
        populate: [
          {
            path: "carCompany",
            select: "name",
          },
          {
            path: "carTypes",
            select: "name",
          },
        ],
      })
      .populate("company", "fullName");
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

const getCarsByCompany = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carByCompany = await CarDetails.find({ car: id });
    res.json(carByCompany);
  } catch (error) {
    next(error);
  }
};

const createCar = async (req, res, next) => {
  try {
    const imageFile = req.file;

    const imageUrl = "images/" + imageFile.filename;
    const newData = {
      ...req.body,
      image: imageUrl,
    };
    const newCar = await CarDetails.create(newData);
    res.json(newCar);
  } catch (error) {
    next(error);
  }
};
const updateCarDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateCarDetails = req.body;
    await Location.findByIdAndUpdate(id, updateCarDetails, { new: true });

    res.json({ message: `review update successfully` });
  } catch (error) {
    next(error);
  }
};
const deleteCarDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("🚀 ~ deleteCarDetails ~ id:", id);
    await CarDetails.findByIdAndDelete(id);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getCar,
  getSingleCar,
  getCarsByCompany,
  createCar,
  deleteCarDetails,
  updateCarDetails,
};
