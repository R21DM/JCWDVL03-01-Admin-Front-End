import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:2000";

function Home(props) {
  // state
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  // event handler
  const onButtonLogin = () => {};

  // side effect -> similiar with class component's lifecycle method
  useEffect(() => {}, []);

  // conditional rendering : auth protection
  if (isSignIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main">
        {/* --------------------------- Login  ------------------------------*/}
        <div className="login-container"></div>
      </main>
    </div>
  );
}

export default Home;
