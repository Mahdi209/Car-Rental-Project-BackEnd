const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const CarDetailsSchema = new Schema({
  car: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  Color: {
    type: String,
  },
  Year: {
    type: Number,
  },

  status: {
    type: Boolean,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

const CarDetails = model("CarDetails", CarDetailsSchema);

module.exports = CarDetails;
