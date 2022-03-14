import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "./style.css";

function Admin(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const TOKEN = localStorage.getItem("token");
    const KEY = sessionStorage.getItem("key");
    if (!user.id) {
      if (TOKEN || KEY) {
        return;
      } else navigate("login");
    }
  }, []);

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main"></main>
    </div>
  );
}

export default Admin;
