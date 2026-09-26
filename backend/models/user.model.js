import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  otpExpire: Date,
  otp: String,
  password: String
});

export default mongoose.model("User", userSchema);