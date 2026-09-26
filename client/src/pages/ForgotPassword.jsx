import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/auth/forgot-password";

function ForgotPassword() {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();


if (!email) {
  alert("Enter email ❌");
  return;
}

try {
  setLoading(true);

  await axios.post(API, { email });

  alert("OTP sent to email 📧");

  // redirect to reset page
  window.location.href = "/reset";

} catch (error) {
  alert(error.response?.data?.message || "Error ❌");
} finally {
  setLoading(false);
}


};

return ( <div className="auth-container"> <form onSubmit={handleSubmit}> <h2>Forgot Password</h2>

    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <button type="submit" disabled={loading}>
      {loading ? "Sending..." : "Send OTP"}
    </button>
  </form>
</div>


);
}

export default ForgotPassword;
