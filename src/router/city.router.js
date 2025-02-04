const express = require("express");
const cityRouter = express.Router();
const { getCity, createCity } = require("../controller/city.controller");

cityRouter.get("/", getCity);

//post method
cityRouter.post("/", createCity);

module.exports = cityRouter;
