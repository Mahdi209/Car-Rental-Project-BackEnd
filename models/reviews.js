const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const ReviewSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  like: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
  },
  Company: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Reviews = model("Review", ReviewSchema);

module.exports = Reviews;
