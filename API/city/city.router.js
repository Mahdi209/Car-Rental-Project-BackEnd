const express = require("express");
const cityRouter = express.Router();
const { getCity, createCity } = require("./city.controller");

cityRouter.get("/", getCity);

//post method
cityRouter.post("/", createCity);

module.exports = cityRouter;
