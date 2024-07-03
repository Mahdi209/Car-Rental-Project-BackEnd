const getFirebaseImageUrl = require("../../config/firebaseStorageService");
const CarDetails = require("../../models/CarDetails");
const mongoose = require("mongoose");

const getCar = async (req, res, next) => {
  try {
    const cars = await CarDetails.find({})
      .populate({
        path: "car",
        select: "carName ",
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
      .populate("company", "fullName city")
      .select("-color -year  -pricePerWeek");

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
    const companyId = req.user.id;
    const carByCompany = await CarDetails.find({ company: companyId })
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

    res.json(carByCompany);
  } catch (error) {
    next(error);
  }
};
const getCompanyCar = async (req, res, next) => {
  try {
    const id = req.params.id;
    const caCompany = await CarDetails.find({ company: id })
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

    res.json(caCompany);
  } catch (error) {
    next(error);
  }
};
const createCar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(401).json({ message: "Profile picture is required" });
    }
    const imageUrl = await getFirebaseImageUrl(
      "cars-Images",
      req.file.path,
      req.file.filename
    );
    const newData = {
      car: req.body.carName,
      company: req.body.company,
      color: req.body.color,
      year: req.body.year,
      status: true,
      pricePerDay: req.body.pricePerDay,
      pricePerWeek: req.body.pricePerWeek,
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
    const newData = {
      status: req.body.status,
      pricePerDay: req.body.pricePerDay,
      pricePerWeek: req.body.pricePerWeek,
    };

    const updatedCar = await CarDetails.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car updated successfully", updatedCar });
  } catch (error) {
    next(error);
  }
};
const deleteCarDetails = async (req, res, next) => {
  try {
    const id = req.params.id;
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
  getCompanyCar,
};
