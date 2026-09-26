import dotenv from "dotenv";
dotenv.config();

import orderRoute from "./routes/order.route.js";
import express from "express";
import connectDB from "./config/db.connect.js";
import uploadRoute from "./routes/upload.route.js";
import multer from "multer";
import cloudinary from "./config/cloudinary.js";
import cors from "cors";
import productRoute from "./routes/product.route.js";
import authRoute from "./routes/auth.route.js";
import  paymentRoute  from "./routes/payment.route.js";



const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ DB
connectDB();
// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/orders", orderRoute);

// ================= MULTER (Memory Storage) =================
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ================= ROUTES =================
app.get("/", (req, res) => {
res.send("API Running 🚀");
});

// 🔥 Direct Cloudinary Upload (no local storage)
app.post("/image-upload", upload.single("file"), async (req, res) => {
try {
if (!req.file) {
return res.status(400).json({ message: "No file uploaded ❌" });
}


// buffer → base64
const b64 = Buffer.from(req.file.buffer).toString("base64");
const dataURI = `data:${req.file.mimetype};base64,${b64}`;

// upload to cloudinary
const result = await cloudinary.uploader.upload(dataURI);

res.json({
  message: "Image uploaded successfully ✅",
  url: result.secure_url,
});


} catch (error) {
res.status(500).json({ error: error.message });
}
});

// ================= SERVER =================
app.listen(PORT, () => {
console.log(`Server running on ${PORT} 🚀`);
});
