import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: String,
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);