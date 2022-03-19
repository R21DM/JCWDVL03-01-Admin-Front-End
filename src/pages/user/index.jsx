import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Table, Pagination } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function User() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  //Variable Names
  const [page, setPage] = useState(1);
  const [indexStartItem, setIndexStartItem] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);

  //Get User Data
  const getUserData = () => {
    Axios.get(API_URL + `/users/showAllUser`)
      .then((respond) => {
        console.log(respond.data);
        setData(respond.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //Load user data
    getUserData();

    const TOKEN = localStorage.getItem("token");
    const KEY = sessionStorage.getItem("key");
    if (!user.id) {
      if (TOKEN || KEY) {
        return;
      } else navigate("../login");
    }
  }, []);

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 10;
  const endPageNumber = Math.ceil(data.length / itemPerPage);
  for (let number = 1; number <= endPageNumber; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  //Radio Button Controller
  const radios = [
    { name: "Off", value: "0" },
    { name: "On", value: "1" },
  ];

  //Active - Deactive User Handler
  const changeUserActive = (id, state) => {
    //Toggle loading
    setLoading({ ...loading, [id]: true });

    //Create user data
    const status = state ? 1 : 0;
    const userData = { id, status };

    console.log(userData);

    //POST to backend
    Axios.post(API_URL + `/users/status`, userData)
      .then((respond) => {
        console.log(respond.data);
        getUserData();
        setLoading({ ...loading, [id]: false });
      })
      .catch((error) => {
        console.log(error);
        setLoading({ ...loading, [id]: false });
      });
  };

  useEffect(() => {
    //Set pagination
    const startIndex = 0 + itemPerPage * (page - 1);
    setIndexStartItem(startIndex);

    //Check page
    console.log("current page:", page);
  }, [page]);

  const renderAllUser = () => {
    return data
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((val, idx) => {
        const role = val.role === 2 ? "User" : "Admin";
        const activeUser = String(val.verified_user);
        const register = val.create_at.slice(0, 10);
        const userNo = idx + 1 + itemPerPage * (page - 1);

        return (
          <tr key={val.id}>
            <td>{userNo}</td>
            <td>{val.username}</td>
            <td>{role}</td>
            <td>{val.email}</td>
            <td>{val.phone}</td>
            <td>{register}</td>
            <td>
              <Form className="center-item">
                <Form.Check
                  type="switch"
                  disabled={loading[val.id]}
                  id={val.id}
                  checked={val.verified_user === 1}
                  onChange={(e) =>
                    changeUserActive(e.target.id, e.target.checked)
                  }
                />
              </Form>
            </td>
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
      <div className="d-flex justify-content-center py-2">
        <Pagination>
          <Pagination.Prev
            disabled={page === 1 ? true : false}
            onClick={() => setPage(page - 1)}
          />
          {items}
          <Pagination.Next
            disabled={page === endPageNumber ? true : false}
            onClick={() => setPage(page + 1)}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default User;
