const express = require("express");
const carCompanyRouter = express.Router();
const { getCarCompany, createCarCompany } = require("./carCompany.controller");

carCompanyRouter.get("/", getCarCompany);

carCompanyRouter.post("/", createCarCompany);

module.exports = carCompanyRouter;
