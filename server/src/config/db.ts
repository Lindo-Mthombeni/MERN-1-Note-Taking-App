import { log } from "node:console";
import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("Error: MONGO_URI is not defined in .env");
    process.exit(1);
  }
  try {
    const connect = await mongoose.connect(uri); // as string
    log(`MongoDB Connected Successfully`);
  } catch (error) {
    log(error);
    process.exit(1);
  }
};
