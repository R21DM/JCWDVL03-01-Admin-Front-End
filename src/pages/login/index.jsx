import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:2000";

function Login(props) {
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
        <div className="login-container">
          <div class="container">
            <div className="login-form">
              <h2 className="center-item">Sign In</h2>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassWord(e.target.value)}
                  />
                </Form.Group>

                <h3 className="register-now">
                  Don't have an account ?{" "}
                  <Link to="/register">Register Now</Link>
                </h3>
                {error ? (
                  <Alert variant="danger">
                    Error : username or password doesn't match
                  </Alert>
                ) : null}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Remember Me" />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={onButtonLogin}
                  disabled={loading}
                  style={{ marginLeft: "20vw", marginTop: "-12vh" }}
                >
                  {loading ? (
                    <Spinner animation="border" variant="light" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
