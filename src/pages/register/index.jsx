import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/css/style.css";
// import Axios from "axios";

function Register() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "assets/js/main.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div></div>;
}

export default Register;
