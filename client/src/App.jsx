import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
// import PaymentPage from "./pages/PaymentPage";

import Success from "./pages/Success";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PaymentPage from "./pages/PaymentPage";
import "./App.css";

const API = "http://localhost:3000/api/products";

// 🔒 Protected Route
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

// 🛒 Dashboard
function Dashboard() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(API);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (<div className="container">
    <div className="dashboard-header">
      <h1 className="dashboard-title">🛒Product Dashboard </h1>
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </div>



    <ProductForm getProducts={getProducts} />
    <ProductList products={products} getProducts={getProducts} />
  </div>


  );
}

// 🚀 Main App
function App() {
  return (<BrowserRouter> <Routes>


    {/* Auth */}
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/forgot" element={<ForgotPassword />} />
    <Route path="/reset" element={<ResetPassword />} />
    {/* Protected Dashboard */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route path="/payment" element={<PaymentPage />} />
    <Route path="/success" element={<Success />} />
  </Routes>
  </BrowserRouter>


  );
}

export default App;
