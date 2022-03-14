import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Transaction() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(API_URL + `/transaction`)
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
      const order_date = val.create_at.slice(0, 10);
      const total_price = `Rp ${val.total_price.toLocaleString("id-ID")},-`;

      return (
        <tr key={val.id}>
          <td>{idx + 1}</td>
          <td>{val.code}</td>
          <td>{val.username}</td>
          <td>{val.shipping}</td>
          <td>{total_price}</td>
          <td>{order_date}</td>
          <td>{val.status}</td>
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
              <th>Invoice Code</th>
              <th>Buyer</th>
              <th>Shipping</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{renderAllUser()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default Transaction;
