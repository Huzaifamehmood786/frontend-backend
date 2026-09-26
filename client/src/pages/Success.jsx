import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>🎉 Payment Successful</h1>

        <h3>{state?.name}</h3>
        <p>Rs {state?.price}</p>

        <button onClick={() => navigate("/dashboard")}>Go Home</button>
      </div>
    </div>
  );
}

export default Success;