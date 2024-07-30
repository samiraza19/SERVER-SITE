const mongoose = require("mongoose");

const users = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  login_count: {
    type: Number,
    default: 0,
  },
  first_Name: {
    type: String,
    required: true,
  },
  last_Name: {
    type: String,
  },
  profile_Pic: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const Users_Schema = mongoose.model("users", users);

module.exports = Users_Schema;
