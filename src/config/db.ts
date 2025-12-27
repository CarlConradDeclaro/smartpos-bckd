import mongoose from "mongoose";

export default async function dbConnect() {
  const conn = await mongoose.connect(process.env.MONGODB_URI!);
}
