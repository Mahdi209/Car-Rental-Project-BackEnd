const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const carTypeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const CarType = model("CarType", carTypeSchema);

module.exports = CarType;
