import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Pagination } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Report(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [sold, setSold] = useState([]);
  //Pagination

  //Variable Name
  const [page, setPage] = useState(1);
  const [editableItem, setEditableItem] = useState({});
  const [indexStartItem, setIndexStartItem] = useState(0);

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 5;
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
    Axios.get(API_URL + `/products/log`)
      .then((respond) => {
        setData(respond.data);
      })
      .catch((error) => console.log(error));
    Axios.get(API_URL + `/products/sold`)
      .then((respond) => {
        setSold(respond.data);
        console.log(respond.data);
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

  useEffect(() => {
    //Set pagination
    const startIndex = 0 + itemPerPage * (page - 1);
    setIndexStartItem(startIndex);

    //Check page
    console.log("current page:", page);
  }, [page]);

  const renderReport = () => {
    console.log(data);
    return data
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((data, no) => {
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

  const renderReportMostSold = () => {
    console.log(data);
    return sold.slice(0, 3).map((sold, no) => {
      console.log();
      return (
        <tr key={{}}>
          <td>{sold.product_name}</td>
          <td>{sold.jumlah}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main">
        <div className="table">
          <Table striped bordered hover size="sm">
            <thead>
              <h5>Top 3 Most Sold</h5>
              <tr>
                <th>Product</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>{renderReportMostSold()}</tbody>
          </Table>

          <Table striped bordered hover size="sm">
            <thead>
              <h5 style={{ marginTop: "4%" }}>Sold Products</h5>
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
        {/* ---------Pagination---------- */}
        <div className="d-flex justify-content-center py-2">
          <Pagination>
            <Pagination.Prev
              disabled={page == 1 ? true : false}
              onClick={() => setPage(page - 1)}
            />
            {items}
            <Pagination.Next
              disabled={page == endPageNumber ? true : false}
              onClick={() => setPage(page + 1)}
            />
          </Pagination>
        </div>
      </main>
    </div>
  );
}

export default Report;
