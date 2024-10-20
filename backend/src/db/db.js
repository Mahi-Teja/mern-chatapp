const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connection successfull " + Date.now());
  } catch (error) {
    console.log("error occured connecting DB: " + error);
  }
};

module.exports = dbConnect;
