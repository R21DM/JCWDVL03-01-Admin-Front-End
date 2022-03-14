import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function User() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(API_URL + `/users/showAllUser`)
      .then((respond) => {
        console.log(respond.data);
        setData(respond.data);
      })
      .catch((error) => console.log(error));

    const TOKEN = localStorage.getItem("token");
    const KEY = sessionStorage.getItem("key");
    if (!user.id) {
      if (TOKEN || KEY) {
        return;
      } else navigate("../login");
    }
  }, []);

  const renderAllUser = () => {
    return data.map((val, idx) => {
      const role = val.role === 2 ? "User" : "Admin";
      const active = val.verified_user === 1 ? "Active" : "Not Active";
      const register = val.create_at.slice(0, 10);

      return (
        <tr key={val.id}>
          <td>{idx + 1}</td>
          <td>{val.username}</td>
          <td>{role}</td>
          <td>{val.email}</td>
          <td>{val.phone}</td>
          <td>{register}</td>
          <td>{active}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="table">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Role</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registered at</th>
              <th>Activate</th>
            </tr>
          </thead>
          <tbody>{renderAllUser()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default User;
