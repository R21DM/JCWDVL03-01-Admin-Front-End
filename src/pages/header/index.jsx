import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import "./style.css";

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "http://localhost:2000";

function Navbar(props) {
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
      <div id="topbar" class="d-flex align-items-center fixed-top">
        <div class="container d-flex align-items-center justify-content-center justify-content-md-between">
          <div class="align-items-center d-none d-md-flex">
            <i class="bi bi-clock"></i> Monday - Saturday, 8AM to 10PM
          </div>
          <div class="d-flex align-items-center">
            <i class="bi bi-phone"></i> Call us now +62 8123 4567 891
          </div>
        </div>
      </div>

      {/* --------------------------- Header ------------------------------*/}

      <header id="header" class="fixed-top">
        <div class="container d-flex align-items-center">
          <a href="index.html" class="logo me-auto">
            <img src="assets/img/logo.png" alt="" />
          </a>

          <h1 class="logo me-auto"></h1>

          <nav id="navbar" class="navbar order-last order-lg-0">
            <ul>
              <li>
                <a class="nav-link scrollto" href="/">
                  Home
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#services">
                  Services
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#departments">
                  Departments
                </a>
              </li>
              <li>
                <a class="nav-link scrollto" href="#doctors">
                  Doctors
                </a>
              </li>
              <li class="dropdown">
                <a href="#">
                  <span>Drop Down</span> <i class="bi bi-chevron-down"></i>
                </a>
                <ul>
                  <li>
                    <a href="#">Drop Down 1</a>
                  </li>
                  <li class="dropdown">
                    <a href="#">
                      <span>Deep Drop Down</span>
                      <i class="bi bi-chevron-right"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="#">Deep Drop Down 1</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 2</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 3</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 4</a>
                      </li>
                      <li>
                        <a href="#">Deep Drop Down 5</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Drop Down 2</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 3</a>
                  </li>
                  <li>
                    <a href="#">Drop Down 4</a>
                  </li>
                </ul>
              </li>
              <li>
                <a class="nav-link scrollto" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav>

          <a href="#appointment" class="appointment-btn scrollto">
            <span class="d-none d-md-inline">Make an</span> Appointment
          </a>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
