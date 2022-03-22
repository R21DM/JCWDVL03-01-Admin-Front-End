import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const URL = process.env.REACT_APP_API_URL;

function Change() {
  //Get data from query params
  const query_param = useLocation();
  const params = new URLSearchParams(query_param.search);
  const token = params.get("token");

  const navigate = useNavigate();

  //Variable Name
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  //Show Modal & Modal Handler
  const [showModal, setModal] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
    navigate("/login");
  };

  //Error state
  const [errorPassword, setErrorPassword] = useState(true);
  const [errorConfirm, setErrorConfirm] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log(token);
    //Check user data
    Axios.get(URL + `/users/getAll?token=${token}`)
      .then((respond) => {
        setUsername(respond.data[0].username);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        console.log("User not found");
      });
  }, []);

  const onHandlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const onHandleConfirm = (event) => {
    let value = event.target.value;
    setConfirm(value);
    validateConfirm(value);
  };

  //Clear Input Form
  const clearInput = () => {
    setPassword("");
    setConfirm("");
  };

  // Validation

  const validatePassword = (password) => {
    let number = /[0-9]/;
    let special = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/;

    //Rules : must include number and special character, password length minimum 8 char
    if (
      !number.test(password) ||
      !special.test(password) ||
      password.length < 8
    ) {
      console.log("Password invalid");
      setErrorPassword(true);
      return;
    }

    //Password is valid
    console.log("Password OK");
    setErrorPassword(false);
  };

  const validateConfirm = (confirm) => {
    //Confirm password checking
    if (!(confirm === password)) {
      setErrorConfirm(true);
      console.log("Password doesn't match");
      return;
    }
    //Confirm is valid
    console.log("Confirm password OK");
    setErrorConfirm(false);
  };

  //Register Function
  const onChangePassword = (event) => {
    //event.preventDefault() --> Disable default behavior event submit (disable refresh page)
    event.preventDefault();
    Axios.post(URL + `/users/change-pass`, { token, password })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    clearInput();
    setModal(true);
  };

  //Render webpage
  return (
    <div>
      {/* --------------------------- Header ------------------------------*/}

      <header id="header" className="header center-logo">
        <div className="header">
          <div className="logo">
            <img
              className="logonya"
              src="/assets/img/logo.png"
              alt=""
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </header>

      <div className="change-container">
        <div className="container">
          <div className="change-form">
            {error ? (
              <div>
                <h2 style={{ color: "red", marginLeft: "15%" }}>
                  User Not Found
                </h2>
              </div>
            ) : (
              <div>
                <h2 className="mx-auto mb-3 color">Change Password</h2>
                <Form onSubmit={onChangePassword}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={onHandlePassword}
                      isInvalid={errorPassword}
                    />
                    {errorPassword ? (
                      <Form.Text className="text-muted">
                        Use 8 or more characters and must contain numbers and
                        symbols.
                      </Form.Text>
                    ) : null}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm"
                      value={confirm}
                      onChange={onHandleConfirm}
                      isInvalid={errorConfirm}
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    disabled={errorPassword || errorConfirm || error}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            )}

            {/* ----------------------------------------------- */}
            <Modal show={showModal} onHide={handleCloseModal}>
              <div>
                <Modal.Header closeButton>
                  <Modal.Title className="color">
                    Change Password Success
                  </Modal.Title>
                </Modal.Header>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Change;
