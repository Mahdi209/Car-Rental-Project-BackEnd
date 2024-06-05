const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const carCompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const CarCompany = model("CarCompany", carCompanySchema);

module.exports = CarCompany;
