const Role = require("../models/role");

const getRole = async (req, res, next) => {
  try {
    const role = await Role.find({});

    res.json(role);
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    const name = req.body;
    const role = await Role.create(name);

    res.json(role);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getRole,
  createRole,
};
