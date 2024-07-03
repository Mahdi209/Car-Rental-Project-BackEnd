const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const phoneSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dial_code: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

const Phone = model("Phone", phoneSchema);

module.exports = Phone;
