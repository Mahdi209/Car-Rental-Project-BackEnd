const express = require("express");
const carDetailsRouter = express.Router();
const {
  getCar,
  getCarsByCompany,
  createCar,
  getSingleCar,
  deleteCarDetails,
  updateCarDetails,
  getCompanyCar,
} = require("../controller/carDetails.controller");
const { authenticateToken } = require("../middlewares/auth");
const fileUpload = require("../middlewares/fileUpload");

carDetailsRouter.get("/myCar", authenticateToken, getCarsByCompany);
carDetailsRouter.get("/", getCar);
carDetailsRouter.get("/company/:id", getCompanyCar);

carDetailsRouter.get("/:id", getSingleCar);

carDetailsRouter.post(
  "/",
  authenticateToken,
  fileUpload.array("images", 4),
  createCar
);
carDetailsRouter.delete("/:id", authenticateToken, deleteCarDetails);
carDetailsRouter.put("/:id", authenticateToken, updateCarDetails);

module.exports = carDetailsRouter;
