import stripe from "../config/stripe.js";

const createPaymentIntent = async (req, res) => {
try {
const { product_price, product_name, product_id, product_image } = req.body;


// ✅ Validation
if (!product_price || !product_name || !product_id || !product_image) {
  return res.status(400).json({
    success: false,
    message: "All fields are required ❌"
  });
}

if (typeof product_price !== "number") {
  return res.status(400).json({
    success: false,
    message: "Product price must be number ❌"
  });
}

if (typeof product_id !== "number") {
  return res.status(400).json({
    success: false,
    message: "Product ID must be number ❌"
  });
}

// 💳 Create Payment Intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: product_price,
  currency: "usd",
  automatic_payment_methods: {
    enabled: true
  }
});

res.status(200).json({
  success: true,
  message: "Payment intent created ✅",
  client_secret: paymentIntent.client_secret,
  payment_id: paymentIntent.id
});


} catch (error) {
res.status(500).json({
success: false,
message: error.message
});
}
};
export default createPaymentIntent;