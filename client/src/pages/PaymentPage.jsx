import { useEffect, useState } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../stripe";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { state } = useLocation(); // 🔥 FIRST declare
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!state) return;

    const getClientSecret = async () => {
      try {
        console.log("PRODUCT:", state); // 🔍 debug

        const res = await axios.post(
          "http://localhost:3000/api/payment/payment-intent",
          {
            product_price: Number(state.price), // 🔥 FIX
            product_name: state.name,
            product_id: state._id || 1, // 🔥 FIX
            product_image: state.image || "img", // 🔥 FIX
          }
        );

        // console.log("API RESPONSE:", res.data);

        setClientSecret(res.data.client_secret);
      } catch (error) {
        console.log("PAYMENT ERROR:", error.response || error);
      }
    };

    getClientSecret();
  }, [state]);

  // ❌ agar direct page open ho gaya
  if (!state) {
    return (
      <div className="payment-page">
        <div className="no-product">
          <h2>No product selected ❌</h2>
          <button onClick={() => navigate("/")}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Payment 💳</h2>

        <h3>{state.name}</h3>
        <p>Rs {state.price}</p>

        {/* 🔥 ONLY SHOW WHEN READY */}
        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default PaymentPage;
