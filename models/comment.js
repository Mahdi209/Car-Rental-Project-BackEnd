const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
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

const comment = model("comment", commentSchema);

module.exports = comment;
