const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  picture: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
