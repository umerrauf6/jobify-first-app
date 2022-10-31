import mongoose from "mongoose";

export default function connectDb(URL) {
  return mongoose.connect(URL);
}
