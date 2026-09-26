import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
name: {
type: String,
required: true
},


price: {
  type: Number,
  required: true
},

image: {
  type: String, // Cloudinary URL
  required: true
},

category: {
  type: String,
  required: true
},

// 🔥 user relation (important for auth)
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
}


},
{
timestamps: true
}
);

export default mongoose.model("Product", productSchema);
