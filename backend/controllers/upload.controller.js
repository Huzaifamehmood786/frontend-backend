import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded ❌" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    res.status(200).json({
      message: "Image uploaded ✅",
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
