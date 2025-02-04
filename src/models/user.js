const { default: mongoose } = require("mongoose");
const { model, Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
      },
      message: (password) =>
        `${password.value} is not a valid password. Password must contain at least 8 characters including one uppercase letter, one lowercase letter, one digit, and one special character.`,
    },
  },
  profile: String,
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "City",
    required: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
