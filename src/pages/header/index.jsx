import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:2000";

function NavigationBar(props) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "assets/js/main.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // state
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [show, setShow] = useState(false);

  const showLogin = () => {
    setShow(true);
  };
  const closeLogin = () => {
    setShow(false);
  };

  // event handler
  const onButtonLogin = () => {
    setLoading(true);
  };

  // conditional rendering : auth protection
  if (isSignIn) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex align-items-center justify-content-center justify-content-md-between">
          <div className="align-items-center d-none d-md-flex">
            <i className="bi bi-clock"></i> Monday - Saturday, 8AM to 10PM
          </div>
          <div className="d-flex align-items-center">
            <i className="bi bi-phone"></i> Call us now +62 8123 4567 891
          </div>
        </div>
      </div>

      {/* --------------------------- Header ------------------------------*/}

      <header id="header" className="fixed-top">
        <div className="container d-flex align-items-center">
          <a href="/" className="logo me-auto">
            <img src="assets/img/logo.png" alt="" />
          </a>

          <h1 className="logo me-auto"></h1>

          <Navbar expand="lg" className="nav-container">
            <Container fluid>
              <Navbar.Brand className="nav-brand"></Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                ></Nav>
                <Nav.Item style={{ marginRight: 10 }}></Nav.Item>
                <div className="nav">
                  <a className="nav-link scrollto" href="/">
                    Home
                  </a>

                  <a className="nav-link scrollto" href="#about">
                    About
                  </a>

                  <a className="nav-link scrollto" href="#services">
                    Services
                  </a>

                  <a className="nav-link scrollto" href="#departments">
                    Departments
                  </a>

                  <a className="nav-link scrollto" href="#doctors">
                    Doctors
                  </a>

                  <a className="nav-link scrollto" href="#contact">
                    Contact
                  </a>

                  <Button
                    variant="outline-info"
                    className="button"
                    onClick={showLogin}
                  >
                    Login
                  </Button>
                </div>
              </Navbar.Collapse>
            </Container>

            <Modal show={show} onHide={closeLogin} className="modal-size">
              <Modal.Header className="modal-header">
                <Modal.Title className="center title">Login</Modal.Title>
              </Modal.Header>

              <Modal.Body className="">
                <div className="form">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="form-size"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassWord(e.target.value)}
                      className="form-size"
                    />
                  </Form.Group>
                  {error ? (
                    <Alert variant="danger">
                      Error : username or password doesn't match
                    </Alert>
                  ) : null}
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      className="custom-checkbox"
                    />
                  </Form.Group>
                </div>
                <div>
                  <Button
                    variant="primary"
                    onClick={onButtonLogin}
                    disabled={loading}
                    className="button-login"
                  >
                    {loading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </Modal.Body>

              <Modal.Footer>
                <h4 className="register-now register">
                  Don't have an account?
                  <Link to="#register" onClick={closeLogin}>
                    {" "}
                    Register Now
                  </Link>
                </h4>
              </Modal.Footer>
            </Modal>
          </Navbar>
        </div>
      </header>
    </div>
  );
}

export default NavigationBar;
