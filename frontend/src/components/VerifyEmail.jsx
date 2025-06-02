// frontend/src/pages/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");
  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/verify-email/${token}`);
        const data = await res.json();

        if (res.ok) {
          setMessage(data.message || "Email verified successfully!");
          setTimeout(() => navigate("/login"), 3000);
        } else {
          setError(true);
          setMessage(data.message || "Verification failed or token expired.");
        }
      } catch {
        setError(true);
        setMessage("Something went wrong. Please try again later.");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-email-container" style={{ padding: 20, textAlign: "center" }}>
      <h2>{error ? "Verification Failed" : "Email Verification"}</h2>
      <p>{message}</p>
      {!error && <p>Redirecting to login page shortly...</p>}
    </div>
  );
};

export default VerifyEmail;
