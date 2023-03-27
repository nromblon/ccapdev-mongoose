import mongoose from "mongoose";
import User from "../models/UserModel.js";

// Connect to MONGODB_URI, which also includes the database name
const url = process.env.MONGODB_URI;

export default {
  /*
    connects to database
  */
  connect: () => {
    return mongoose.connect(url);
  },
};
