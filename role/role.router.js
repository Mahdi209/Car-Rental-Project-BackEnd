const express = require("express");
const role = express.Router();
const { getRole, createRole } = require("./role.controller");

role.get("/", getRole);

//post method
role.post("/", createRole);

module.exports = role;
