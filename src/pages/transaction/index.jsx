import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Table, Pagination } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Transaction() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  //Variable Names
  const [page, setPage] = useState(1);
  const [indexStartItem, setIndexStartItem] = useState(0);
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

  useEffect(() => {
    //Set pagination
    const startIndex = 0 + itemPerPage * (page - 1);
    setIndexStartItem(startIndex);

    //Check page
    console.log("current page:", page);
  }, [page]);

  const renderAllTrx = () => {
    return data
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((val, idx) => {
        const order_date = val.create_at.slice(0, 10);
        const total_price = `Rp ${val.total_price.toLocaleString("id-ID")},-`;
        const trxNo = idx + 1 + itemPerPage * (page - 1);

        return (
          <tr key={trxNo}>
            <td>{trxNo}</td>
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
          <tbody>{renderAllTrx()}</tbody>
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

export default Transaction;
