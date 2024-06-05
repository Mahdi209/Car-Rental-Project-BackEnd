const express = require("express");
const carDetailsRouter = express.Router();
const {
  getCar,
  getCarsByCompany,
  createCar,
  getSingleCar,
  deleteCarDetails,
  updateCarDetails,
} = require("./carDetails.controller");
const { authenticateToken } = require("../../middlewares/auth");
const fileUpload = require("../../middlewares/fileUpload");

carDetailsRouter.get("/", getCar);
carDetailsRouter.get("/:id", getSingleCar);
carDetailsRouter.get("/CompanyCar/:id", getCarsByCompany);

carDetailsRouter.post(
  "/",
  authenticateToken,
  fileUpload.single("image"),
  createCar
);
carDetailsRouter.delete("/:id", deleteCarDetails);
carDetailsRouter.put("/", authenticateToken, updateCarDetails);

module.exports = carDetailsRouter;
