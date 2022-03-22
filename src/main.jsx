import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";

// pages
import Product from "./pages/product/index";
import Report from "./pages/report/index";
import Admin from "./pages/admin";
import Login from "./pages/login";
import Header from "./pages/header";
import User from "./pages/user";
import Transaction from "./pages/transaction";
import TransactionDetails from "./pages/transaction-details";
import Change from "./pages/change";

function Main() {
  return (
    <div className="main-container">
      <Routes>
        {/* path="*" : wajib */}
        <Route path="*" element={<MainRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="change-password" element={<Change />} />
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
        <Route path="user" element={<User />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="transaction/:id" element={<TransactionDetails />} />
      </Routes>
    </>
  );
}

export default Main;
