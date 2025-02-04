const express = require("express");
const carTypeRouter = express.Router();
const {
  getCarType,
  createType,
  deleteType,
  updateCarTypeById,
} = require("../controller/carType.controller");

carTypeRouter.get("/", getCarType);

carTypeRouter.delete("/:id", deleteType);

carTypeRouter.post("/", createType);

carTypeRouter.put("/:id", updateCarTypeById);

module.exports = carTypeRouter;
