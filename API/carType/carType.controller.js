const CarType = require("../../models/CarType");

const getCarType = async (req, res, next) => {
  try {
    const Type = await CarType.find();

    res.json(Type);
  } catch (error) {
    next(error);
  }
};

const createType = async (req, res, next) => {
  try {
    const newType = await CarType.create({ ...req.body });
    res.json(newType);
  } catch (error) {
    next(error);
  }
};
const deleteType = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).send("Invalid Car Type ID");
    }
    await CarType.findByIdAndDelete(id);
    res.json({ message: `Type delete successfully` });
  } catch (error) {
    next(error);
  }
};

const updateCarTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateType = req.body;
    await CarType.findByIdAndUpdate(id, updateType, { new: true });

    res.json({ message: `Type update successfully` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCarType,
  createType,
  deleteType,
  updateCarTypeById,
};
