import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

// pages
import Login from "./pages/login/index";
import Home from "./pages/home/index";
import Navbar from "./pages/header";
import Footer from "./pages/footer";

function Main() {
  return (
    <div className="main-container">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default Main;
