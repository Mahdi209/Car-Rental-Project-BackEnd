const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const CarDetailsSchema = new Schema({
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  color: {
    type: String,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  pricePerWeek: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
}, { timestamps: true });
const CarDetails = model("CarDetails", CarDetailsSchema);

module.exports = CarDetails;
