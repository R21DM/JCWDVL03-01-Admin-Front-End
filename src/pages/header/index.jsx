import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/product-actions";
import "../header/style.css";

const API_URL = process.env.REACT_APP_API_URL;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  // state
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalforgot, setModalForgot] = useState(false);
  const [keep, setKeep] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    // check token
    const TOKEN = localStorage.getItem("token");
    if (TOKEN) {
      setIsSignIn(true);
    }

    script.src = "/assets/js/main.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const close = () => {
    setModalForgot(false);
    setShow(true);
    setError2(false);
    setConfirm(false);
  };
  const showLogin = () => {
    setShow(true);
  };
  const closeLogin = () => {
    setShow(false);
  };

  const onButtonLogin = () => {
    setLoading(true);
    Axios.post(API_URL + `/users/get`, { password, username })
      .then((respond) => {
        console.log(respond.data);

        // if error -> show error
        if (!respond.data.length) {
          setError(true);
          setLoading(false);

          return;
        }

        // save token or id in web storage
        localStorage.setItem("token", respond.data[0].token_data);
        // data user dijadikan JWTToken, bisa diubah jadi userdata

        // save data to global storage
        dispatch({
          type: "LOGIN",
          payload: respond.data[0],
        });

        setLoading(false);
        setIsSignIn(true);
        respond.data[0].role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        setShow(false);

        if (!keep) {
          window.onbeforeunload = localStorage.removeItem("token");
        }
        console.log(user);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log(error);
      });
  };

  const onButtonLogout = () => {
    setModal(true);
  };
  const onButtonUserConfirm = () => {
    setIsAdmin(false);
    // clear local storage
    localStorage.removeItem("token");

    // clear global storage
    dispatch({ type: "LOGOUT" });
    setModal(false);
    navigate("/login");
  };
  const forget = () => {
    setModalForgot(true);
    setShow(false);
  };
  const send = () => {
    setLoading(true);
    setError2(false);
    Axios.get(API_URL + `/users/get?email=${email}`)
      .then((respond) => {
        // if error -> show error
        if (!respond.data.length) {
          setError2(true);
          setLoading(false);

          return;
        }

        Axios.get(API_URL + `/users/send?email=${email}`)
          .then((respond) => {})
          .catch((error) => console.log(error));

        setLoading(false);

        setConfirm(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {/* --------------------------- Header ------------------------------*/}

      <header id="header" className="header">
        <div className="container d-flex align-items-center">
          <div className="logo me-auto">
            <img
              className="logonya"
              src="/assets/img/logo.png"
              alt=""
              onClick={() => navigate("")}
            />
          </div>

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
                <div className="nav2">
                  {/* ------------------------------------- Navigate -------------------------------------*/}
                  <div style={{ display: "flex" }}>
                    <Nav.Link onClick={() => navigate("")}>Home</Nav.Link>
                    <Nav.Link onClick={() => navigate("/user")}>User</Nav.Link>
                    <Nav.Link onClick={() => navigate("/product")}>
                      Products
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/report")}>
                      Report
                    </Nav.Link>
                  </div>

                  <div style={{ display: "flex", marginLeft: "2%" }}>
                    <Button
                      variant="outline-success"
                      onClick={onButtonLogout}
                      className="register-btn"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </Navbar.Collapse>
            </Container>

            {/* ------------------------------------- Login -------------------------------------*/}

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
                      checked={keep}
                      onChange={(event) => setKeep(event.target.checked)}
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
                  <Link to="/register" onClick={closeLogin}>
                    {" "}
                    Register Now
                  </Link>
                </h4>
                <h4 className="register-now forgetpw">
                  <Link to="#forgotPassword" onClick={forget}>
                    {" "}
                    Forget Password?
                  </Link>
                </h4>
              </Modal.Footer>
            </Modal>

            {/* ------------------------------------- Forgot -------------------------------------*/}

            <Modal
              show={modalforgot}
              onHide={closeLogin}
              className="modal-size"
            >
              <Modal.Header className="modal-header">
                <Modal.Title className="center-forgot title">
                  Forgot Password
                </Modal.Title>
              </Modal.Header>

              <Modal.Body className="">
                <div className="form">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <input
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-size form-control"
                    />
                  </Form.Group>
                  {error2 ? (
                    <Alert variant="danger" className="alert">
                      Error : can't find email
                    </Alert>
                  ) : confirm ? (
                    <Alert variant="success" className="alert">
                      Check your email!
                    </Alert>
                  ) : null}
                </div>
                <div>
                  <Button
                    variant="primary"
                    onClick={send}
                    disabled={loading}
                    className="button-login"
                  >
                    {loading ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
                <div>
                  <Button
                    variant="secondary"
                    onClick={close}
                    className="button-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </Modal.Body>
            </Modal>

            {/* ---------------------------------- Konfirmasi Exit -------------------------------------*/}

            <Modal
              show={modal}
              onHide={() => setModal(false)}
              className="modal-size2"
            >
              <Modal.Header closeButton>
                <Modal.Title className="title">Konfirmasi</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <p>Apakah anda ingin keluar ?</p>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={() => setModal(false)}>
                  Tidak
                </Button>
                <Button
                  variant="primary"
                  onClick={onButtonUserConfirm}
                  className="btn2"
                >
                  Iya
                </Button>
              </Modal.Footer>
            </Modal>
          </Navbar>
        </div>
      </header>
    </div>
  );
}
export default Header;
