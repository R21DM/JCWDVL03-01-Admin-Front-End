import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

// pages
import Product from "./pages/product/index";
import Report from "./pages/report/index";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Header from "./pages/header";

function Main() {
  return (
    <div className="main-container">
      <Routes>
        {/* path="*" : wajib */}
        <Route path="*" element={<MainRoute />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

function MainRoute() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="" element={<Admin />} />
        <Route path="product" element={<Product />} />
        <Route path="report" element={<Report />} />
      </Routes>
    </>
  );
}

export default Main;
