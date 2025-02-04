const express = require("express");
const carRouter = express.Router();
const { getCar, getCarsByCompany, createCar } = require("../controller/car.controller");

carRouter.get("/", getCar);
carRouter.get("/CompanyCar/:id", getCarsByCompany);

carRouter.post("/", createCar);

module.exports = carRouter;
