// Connecting to mongodb
import mongoose from "mongoose";

export const connectedDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to mongoDB!!");
  } catch (error) {
    console.log("Cannot connect to database", error);
    process.exit(1);
  }
};
