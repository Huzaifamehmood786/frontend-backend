import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
try {
const { product_price, product_name, product_id, product_image } = req.body;

console.log("BODY:", req.body);

// ✅ basic validation
if (!product_price || !product_name || !product_id) {
  return res.status(400).json({
    success: false,
    message: "Required fields missing ❌",
  });
}

// ❌ REMOVE THIS (galat tha)
// if (typeof product_id !== "number") { ... }

// ✅ correct check
if (typeof product_price !== "number") {
  return res.status(400).json({
    success: false,
    message: "Price must be number ❌",
  });
}

// 💳 create payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: product_price * 100, // 🔥 cents
  currency: "usd",
  automatic_payment_methods: {
    enabled: true,
  },
});

res.status(200).json({
  success: true,
  client_secret: paymentIntent.client_secret,
});


} catch (error) {

res.status(500).json({
  success: false,
  message: error.message,
});


}
};
export default createPaymentIntent;