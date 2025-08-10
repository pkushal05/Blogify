import mongoose from "mongoose";
import DB_NAME from "../utils/constants.js";

const connectDB = async () => {
  try {
    // Connect to MongoDB using URI from environment variables and database name constant
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("Databse connected successfully!");
  } catch (error) {
    // Log error message and exit process on failure
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
