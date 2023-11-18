const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/doctor");
    console.log(
      `MongoDB connection established on  ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
