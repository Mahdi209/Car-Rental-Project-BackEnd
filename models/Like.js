const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const LikeSchema = new Schema({
  Like: {
    type: Number,
    default: 0,
  },

  Company: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Like = model("Like", LikeSchema);

module.exports = Like;
