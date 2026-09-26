import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/products";
const UPLOAD_API = "http://localhost:3000/image-upload";

function ProductForm({ getProducts }) {
const [form, setForm] = useState({
name: "",
price: "",
category: "",
image: ""
});

const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);

// ✅ Upload Image
const handleUpload = async () => {
if (!file) {
alert("Please select image ❌");
return;
}

try {
  const data = new FormData();
  data.append("file", file);

  setLoading(true);

  const res = await axios.post(UPLOAD_API, data);

  setForm({ ...form, image: res.data.url });

  alert("Image Uploaded ✅");
} catch (error) {
  console.log("UPLOAD ERROR:", error.response || error);
  alert("Image upload failed ❌");
} finally {
  setLoading(false);
}


};

// ✅ Add Product
const handleSubmit = async (e) => {
e.preventDefault();

if (!form.image) {
  alert("Upload image first ❌");
  return;
}

try {
  await axios.post(API, {
    ...form,
    price: Number(form.price) // 🔥 IMPORTANT FIX
  });

  alert("Product Added ✅");

  setForm({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  setFile(null);

  getProducts();

} catch (error) {
  console.log("PRODUCT ERROR:", error.response || error);
  alert("Product add failed ❌");
}


};

return ( <form onSubmit={handleSubmit} className="form"> <h1 className="add-product">Add Product</h1>


  <input
    placeholder="Product Name"
    value={form.name}
    onChange={(e) =>
      setForm({ ...form, name: e.target.value })
    }
  />

  <input
    placeholder="Price"
    value={form.price}
    onChange={(e) =>
      setForm({ ...form, price: e.target.value })
    }
  />

  <input
    placeholder="Category"
    value={form.category}
    onChange={(e) =>
      setForm({ ...form, category: e.target.value })
    }
  />

  <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
  />

  <button type="button" onClick={handleUpload}>
    {loading ? "Uploading..." : "Upload Image"}
  </button>

  <button type="submit">Add Product</button>
</form>


);
}

export default ProductForm;
