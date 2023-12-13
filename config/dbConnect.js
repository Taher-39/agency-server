const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cvvga4z.mongodb.net/creativeAgency`;

const dbConnect = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = dbConnect;
