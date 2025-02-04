const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const citySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const City = model("City", citySchema);

module.exports = City;
