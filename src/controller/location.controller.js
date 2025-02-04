const Location = require("../models/location");

const getLocation = async (req, res, next) => {
  try {
    const location = await Location.find().populate("user", "fullName");

    res.json(location);
  } catch (error) {
    next(error);
  }
};

const getCompanyLocation = async (req, res, next) => {
  try {
    const id = req.user.id;
    const companyLocation = await Location.find({ user: id });
    res.json(companyLocation);
  } catch (error) {
    next(error);
  }
};

const createLocation = async (req, res, next) => {
  try {
    const newLocation = await Location.create({
      ...req.body,
      user: req.user.id,
    });
    res.json(newLocation);
  } catch (error) {
    next(error);
  }
};
const updateLocation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateLocation = req.body;
    await Location.findByIdAndUpdate(id, updateLocation, { new: true });

    res.json({ message: `Location update successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLocation,
  getCompanyLocation,
  createLocation,
  updateLocation,
};
