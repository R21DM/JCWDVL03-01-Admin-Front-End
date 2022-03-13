import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Report(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(API_URL + `/products/log`)
      .then((respond) => {
        setData(respond.data);
      })
      .catch((error) => console.log(error));

    const TOKEN = localStorage.getItem("token");
    if (!user.id) {
      if (TOKEN) {
        return;
      } else navigate("../login");
    }
  }, []);

  const renderReport = () => {
    console.log(data);
    return data.map((data, no) => {
      var createDate = new Date(data.create_at).toLocaleDateString("id");
      var createTime = new Date(data.create_at).toLocaleTimeString("id");
      var updateDate = new Date(data.update_at).toLocaleDateString("id");
      var updateTime = new Date(data.update_at).toLocaleTimeString("id");
      console.log();
      return (
        <tr key={data.id}>
          <td>{no + 1}</td>
          <td>{data.username}</td>
          <td>{data.product_name}</td>
          <td>{data.qty}</td>
          <td>{data.detail}</td>
          <td>{createDate + "  " + createTime}</td>
          <td>{updateDate + "  " + updateTime}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main">
        <div className="table">
          <Table>
            <thead>
              <tr>
                <th>No.</th>
                <th>User</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Detail</th>
                <th>Date</th>
                <th>Date (Updated)</th>
              </tr>
            </thead>
            <tbody>{renderReport()}</tbody>
          </Table>
        </div>
      </main>
    </div>
  );
}

export default Report;
