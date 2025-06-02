import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice"; // adjust path as needed
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      dispatch(loginSuccess({ user: data.user, token: data.token }));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white px-4">
      <motion.form
        onSubmit={handleLogin}
        className="bg-[#1e293b] p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold flex items-center gap-2 justify-center text-green-400">
          <FaSignInAlt /> Login
        </h2>
        <div className="space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-3 rounded-lg bg-gray-800" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full p-3 rounded-lg bg-gray-800" />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-semibold transition">Login</button>
      </motion.form>
    </motion.div>
  );
};

export default LoginForm;
