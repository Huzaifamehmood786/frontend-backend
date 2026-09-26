import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/auth/register";

function Signup() {
const [form, setForm] = useState({
name: "",
email: "",
password: ""
});

const [loading, setLoading] = useState(false);

const handleSignup = async (e) => {
e.preventDefault();


if (!form.name || !form.email || !form.password) {
  alert("All fields required ❌");
  return;
}

try {
  setLoading(true);

  await axios.post(API, form);

  alert("User registered ✅");

  // ✅ redirect to login
  window.location.href = "/";

} catch (error) {
  alert(error.response?.data?.message || "Signup failed ❌");
} finally {
  setLoading(false);
}


};

return ( 
<div className="auth-container">
 <form onSubmit={handleSignup}> <h2>Signup</h2>


    <input
      type="text"
      placeholder="Name"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
      type="email"
      placeholder="Email"
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

    <input
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    <button type="submit" disabled={loading}>
      {loading ? "Creating..." : "Signup"}
    </button>

    <p>
      Already have an account?{" "}
      <a href="/">Login</a>
    </p>
  </form>
</div>
    

)};



export default Signup;
