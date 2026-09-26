import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";

export default function CheckoutForm() {
const stripe = useStripe();
const elements = useElements();

const handleSubmit = async (e) => {
e.preventDefault();


if (!stripe || !elements) return;

const result = await stripe.confirmPayment({
  elements,
  confirmParams: {
    return_url: "http://localhost:5173/success", // 🔥 success page
  },
});

if (result.error) {
  alert(result.error.message);
}


};

return ( <form onSubmit={handleSubmit}> <PaymentElement />


  <button disabled={!stripe}>
    Pay Now 💳
  </button>
</form>


);
}
