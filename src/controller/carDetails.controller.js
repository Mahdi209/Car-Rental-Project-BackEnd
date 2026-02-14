const CarDetails = require("../models/CarDetails");
const mongoose = require("mongoose");
const fs = require("fs").promises;

const getCar = async (req, res, next) => {
  try {
    const cars = await CarDetails.find({})
      .populate({
        path: "car",
        select: "carName seats ",
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
      .select("-color   -pricePerWeek");

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
      .populate("company", "fullName phone");

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
        select: "carName engine seats Gear year",
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
    if (!req.files || req.files.length !== 4) {
      return res.status(401).json({ message: "Exactly 4 images are required" });
    }

    const imageNames = [];

    for (const file of req.files) {
      const imageName = file.path.split("public")[1].replace(/\\/g, "/");
      imageNames.push(imageName);
    }

    const newData = {
      car: req.body.carName,
      company: req.body.company,
      color: req.body.color,
      year: req.body.year,
      status: true,
      pricePerDay: req.body.pricePerDay,
      pricePerWeek: req.body.pricePerWeek,
      images: imageNames,
    };

    const newCar = await CarDetails.create(newData);
    res.json({
      message: "Car created successfully",
      car: newCar,
    });
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
