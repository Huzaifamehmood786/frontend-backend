import { useState, useEffect } from "react";
import axios from "axios";
import OTPInput from "../components/OTPInput";

const API = "http://localhost:3000/api/auth";

function ResetPassword() {
const [form, setForm] = useState({
email: "",
newPassword: ""
});

const [otp, setOtp] = useState(["", "", "", "", "", ""]);
const [loading, setLoading] = useState(false);


const [timer, setTimer] = useState(60);

useEffect(() => {
if (timer === 0) return;

const interval = setInterval(() => {
  setTimer((prev) => prev - 1);
}, 1000);

return () => clearInterval(interval);


}, [timer]);

// 🔁 Resend OTP
const handleResend = async () => {
if (!form.email) {
alert("Enter email first ❌");
return;
}


try {
  await axios.post(`${API}/forgot-password`, {
    email: form.email
  });

  alert("OTP resent 📧");
  setTimer(60);
  setOtp(["", "", "", "", "", ""]); // reset boxes

} catch (error) {
  alert(error.response?.data?.message || "Error ❌");
}


};


const handleReset = async (e) => {
e.preventDefault();

const finalOtp = otp.join("");

if (!form.email || !finalOtp || !form.newPassword) {
  alert("All fields required ❌");
  return;
}

try {
  setLoading(true);

  await axios.post(`${API}/reset-password`, {
    email: form.email,
    otp: finalOtp,
    newPassword: form.newPassword
  });

  alert("Password reset successful ✅");

  window.location.href = "/";

} catch (error) {
  alert(error.response?.data?.message || "Error ❌");
} finally {
  setLoading(false);
}


};

return (
     <div className="auth-container">
         <form onSubmit={handleReset}> 
            <h2>Reset Password</h2>


    <input
      type="email"
      placeholder="Email"
      value={form.email}
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

    {/* 🔢 OTP BOXES */}
    <OTPInput otp={otp} setOtp={setOtp} />

    {/* ⏱ Timer */}
    <p style={{ fontSize: "12px" }}>
      {timer > 0 ? `Resend in ${timer}s` : "You can resend OTP"}
    </p>

    {/* 🔁 Resend */}
    <button
      type="button"
      onClick={handleResend}
      disabled={timer > 0}
    >
      Resend OTP
    </button>

    <input
      type="password"
      placeholder="New Password"
      value={form.newPassword}
      onChange={(e) =>
        setForm({ ...form, newPassword: e.target.value })
      }
    />

    <button type="submit" disabled={loading}>
      {loading ? "Resetting..." : "Reset Password"}
    </button>
  </form>
</div>


);
}

export default ResetPassword;
