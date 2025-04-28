import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Default import
import About from "./pages/About"; // Default import
import Services from "./pages/Services"; // Default import
import Contact from "./pages/Contact"; // Default import

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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
