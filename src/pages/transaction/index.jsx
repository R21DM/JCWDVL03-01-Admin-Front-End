import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Table, Pagination, Form } from "react-bootstrap";
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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [dateFilter, setDateFilter] = useState(false);

  //Get All Transactions Data
  const getTxnAll = () => {
    Axios.get(API_URL + `/transaction`)
      .then((respond) => {
        console.log(respond.data);
        setData(respond.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //Get all transactions data
    getTxnAll();

    const TOKEN = localStorage.getItem("token");
    const KEY = sessionStorage.getItem("key");
    if (!user.id) {
      if (TOKEN || KEY) {
        return;
      } else navigate("../login");
    }
  }, []);

  //Filter Date
  const filterDate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log(start.getTime());
    console.log(Math.floor(Date.now() / 100000) * 100000);

    const result = data.filter((val) => {
      //Filter if start value null
      if (!startDate) {
        return new Date(val.create_at.slice(0, 10)).getTime() <= end.getTime();
      }

      //Filter if end value null
      if (!endDate) {
        return (
          new Date(val.create_at.slice(0, 10)).getTime() >= start.getTime()
        );
      }

      //Filter if both values not null
      return (
        new Date(val.create_at.slice(0, 10)).getTime() >= start.getTime() &&
        new Date(val.create_at.slice(0, 10)).getTime() <= end.getTime()
      );
    });
    console.log(result);

    setFilteredData(result);
    setDateFilter(true);
    setPage(1);
  };

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 10;
  const showData = dateFilter ? filteredData : data;
  const endPageNumber = Math.ceil(showData.length / itemPerPage);
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
    //Show data
    const showData = dateFilter ? filteredData : data;

    return showData
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((val, idx) => {
        const order_date = val.create_at.slice(0, 10);
        const total_price = `Rp ${val.total_price.toLocaleString("id-ID")},-`;
        const trxNo = idx + 1 + itemPerPage * (page - 1);

        return (
          <tr key={val.id}>
            <td>{trxNo}</td>
            <td>{val.code}</td>
            <td>{val.username}</td>
            <td>{val.shipping}</td>
            <td>{total_price}</td>
            <td>{order_date}</td>
            <td>{val.status}</td>
            <td className="center-item">
              <Button
                id={val.id}
                size="sm"
                onClick={(e) => navigate(`${e.target.id}`)}
              >
                Details
              </Button>
            </td>
          </tr>
        );
      });
  };

  return (
    <div className="d-flex flex-column">
      <Form className="mx-5 d-flex flex-column justify-content-center my-2 bg-light py-2">
        <Form.Group className="mx-auto">
          <Form.Label className="fw-bold">Filter Date</Form.Label>
        </Form.Group>
        <Form.Group className="d-flex mx-auto">
          <Form.Control
            type="date"
            name="start"
            className="me-2"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Form.Label className="me-2 my-auto">{` - `}</Form.Label>
          <Form.Control
            type="date"
            name="end"
            className="me-2"
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button onClick={() => filterDate()}>Search</Button>
        </Form.Group>
      </Form>
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
              <th>Action</th>
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
