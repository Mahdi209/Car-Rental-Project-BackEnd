const Phone = require("../../models/phoneCode");
const express = require("express");
const phoneRouter = express.Router();

const getPhone = async (req, res, next) => {
  try {
    const phone = await Phone.find();

    res.json(phone);
  } catch (error) {
    next(error);
  }
};
const getByIdPhone = async (req, res, next) => {
  try {
    id = req.params.id;
    const phone = await Phone.findById(id);

    res.json(phone);
  } catch (error) {
    next(error);
  }
};

phoneRouter.get("/", getPhone);
phoneRouter.get("/:id", getByIdPhone);

module.exports = phoneRouter;
