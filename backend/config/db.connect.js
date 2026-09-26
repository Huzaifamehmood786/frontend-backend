import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");

  } catch (error) {
    console.log("DB Error ❌", error.message); // 👈 ye print karega
  }
};

export default connectDB;