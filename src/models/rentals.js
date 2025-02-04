const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const locationSchema = new Schema({
  dateStart: {
    type: Date,

    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  driver: {
    type: Boolean,
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Location = model("Location", locationSchema);

module.exports = Location;
