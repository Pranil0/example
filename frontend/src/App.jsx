import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./components/VerifyEmail";


const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />  {/* New route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
