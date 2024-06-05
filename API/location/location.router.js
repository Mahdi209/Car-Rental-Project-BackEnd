const express = require("express");
const locationRouter = express.Router();
const {
  getLocation,
  getCompanyLocation,
  createLocation,
  updateLocation,
} = require("./location.controller");
const { authenticateToken } = require("../../middlewares/auth");

locationRouter.get("/", getLocation);
locationRouter.get("/companyLocation/", authenticateToken, getCompanyLocation);

locationRouter.post("/", authenticateToken, createLocation);

locationRouter.put("/:id", authenticateToken, updateLocation);

module.exports = locationRouter;
