const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const locationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
});

const Location = model("Location", locationSchema);

module.exports = Location;
