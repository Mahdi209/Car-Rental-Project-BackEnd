const CarDetails = require("../models/CarDetails");
const mongoose = require("mongoose");
const fs = require('fs').promises;
const s3Client = require("../config/aws-s3");
const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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
    for (let car of cars) {
      const signedUrls = await Promise.all(
        car.images.map(async (imageKey) => {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: imageKey,
          });
          return getSignedUrl(s3Client, command, { expiresIn: 5 * 24 * 60 * 60 });
        })
      );
      car.images = signedUrls;
    }
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

    for (let car of cars) {
      const signedUrls = await Promise.all(
        car.images.map(async (imageKey) => {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: imageKey,
          });
          return getSignedUrl(s3Client, command, { expiresIn: 5 * 24 * 60 * 60 });
        })
      );
      car.images = signedUrls;
    }

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

    for (let car of caCompany) {
      const signedUrls = await Promise.all(
        car.images.map(async (imageKey) => {
          const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: imageKey,
          });
          return getSignedUrl(s3Client, command, { expiresIn: 5 * 24 * 60 * 60 });
        })
      );
      car.images = signedUrls;
    }

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

    // Process all 4 images
    for (const file of req.files) {
      const fileContent = await fs.readFile(file.path);
      const imageName = `car/${file.filename}`;
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: fileContent,
        ContentType: file.mimetype,
      };

      try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        await fs.unlink(file.path);
        imageNames.push(imageName);
      } catch (uploadError) {
        // Clean up the current file
        await fs.unlink(file.path);
        // Clean up any previously uploaded files from S3 for this request
        for (const uploadedImage of imageNames) {
          const deleteParams = {
            Bucket: process.env.BUCKET_NAME,
            Key: uploadedImage
          };
          await s3Client.send(new DeleteObjectCommand(deleteParams));
        }
        return res
          .status(500)
          .json({ message: "Error uploading images", error: uploadError.message });
      }
    }

    const newData = {
      car: req.body.carName,
      company: req.body.company,
      color: req.body.color,
      year: req.body.year,
      status: true,
      pricePerDay: req.body.pricePerDay,
      pricePerWeek: req.body.pricePerWeek,
      images: imageNames
    };

    const newCar = await CarDetails.create(newData);
    res.json({
      message: "Car created successfully",
      car: newCar
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
