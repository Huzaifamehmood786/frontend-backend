import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api/products";

function ProductList({ products, getProducts }) {
const navigate = useNavigate();

// 🗑 Delete Product
const handleDelete = async (id) => {
try {
await axios.delete(`${API}/${id}`);
getProducts();
} catch (error) {
console.log("DELETE ERROR:", error.response || error);
alert("Delete failed ❌");
}
};

// 💳 Buy Product
const handleBuy = (product) => {
navigate("/payment", { state: product }); // 🔥 send product to payment page
};

return ( <div className="grid">
{products.map((p) => ( <div key={p._id} className="card"> <img src={p.image} alt="" width="150" />


      <h3>{p.name}</h3>
      <p>Rs {p.price}</p>
      <span>{p.category}</span>

      {/* 💳 BUY BUTTON */}
      <button onClick={() => handleBuy(p)}>
        Buy Now 💳
      </button>

      {/* 🗑 DELETE */}
      <button onClick={() => handleDelete(p._id)}>
        Delete
      </button>
    </div>
  ))}
</div>


);
}

export default ProductList;
