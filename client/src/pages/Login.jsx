import { useState } from "react";
import axios from "axios";

const API = "http://localhost:3000/api/auth/login";

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();


        if (!form.email || !form.password) {
            alert("All fields required ❌");
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post(API, form);

            // ✅ save token
            localStorage.setItem("token", res.data.token);

            alert("Login successful ✅");

            // ✅ redirect to dashboard
            window.location.href = "/dashboard";

        } catch (error) {
            alert(error.response?.data?.message || "Login failed ❌");
        } finally {
            setLoading(false);
        }


    };

    return (<div className="auth-container"> <form onSubmit={handleLogin}> <h2>Login</h2>


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
        <p>
            <a href="/forgot">Forgot Password?</a>
        </p>
        <button type="submit" disabled={loading}>
            {loading ? "Logging..." : "Login"}
        </button>

        <p>
            Don’t have an account?{" "}
            <a href="/signup">Signup</a>
        </p>
    </form>
    </div>


    );
}

export default Login;
