const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const CarSchema = new Schema({
  carName: {
    type: String,
  },
  carTypes: [
    {
      type: Schema.Types.ObjectId,
      ref: "CarType",
      required: true,
    },
  ],
  engine: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
  },
  Gear: {
    type: String,
    required: true,
  },
});

const Car = model("Car", CarSchema);

module.exports = Car;
