const mongoose = require("mongoose");

const database_Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongoose connected to database");
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
};

module.exports = { database_Connect };
