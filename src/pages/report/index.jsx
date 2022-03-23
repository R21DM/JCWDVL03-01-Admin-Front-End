import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table, Pagination, Form } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function Report(props) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [sold, setSold] = useState([]);
  const [endDate, setEndDate] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [dataMoney, setDataMoney] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [filteredSold, setFilteredSold] = useState([]);
  const [dateFilter, setDateFilter] = useState(false);

  const [totalProfit, setTotalProfit] = useState(null);
  const [filteredProfit, setFilteredProfit] = useState(null);
  const [filteredCost, setFilteredCost] = useState(null);
  const [filteredRevenue, setFilteredRevenue] = useState(null);
  const [filteredProfit2, setFilteredProfit2] = useState(null);
  const [filteredCost2, setFilteredCost2] = useState(null);
  const [filteredRevenue2, setFilteredRevenue2] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  var formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  //Pagination

  //Variable Name
  const [page, setPage] = useState(1);
  const [editableItem, setEditableItem] = useState({});
  const [indexStartItem, setIndexStartItem] = useState(0);

  //Filter Date
  const filterDate = () => {
    console.log(filteredCost2, filteredRevenue2, filteredProfit2);
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    const result = data.filter((val) => {
      //Filter if start value null
      if (!startDate.length) {
        return new Date(val.create_at.slice(0, 10)).getTime() <= end;
      }

      //Filter if end value null
      if (!endDate.length) {
        return new Date(val.create_at.slice(0, 10)).getTime() >= start;
      }

      //Filter if both values not null
      return (
        new Date(val.create_at.slice(0, 10)).getTime() >= start &&
        new Date(val.create_at.slice(0, 10)).getTime() <= end
      );
    });
    const result2 = sold.filter((val) => {
      //Filter if start value null
      if (!startDate.length) {
        return new Date(val.create_at.slice(0, 10)).getTime() <= end;
      }

      //Filter if end value null
      if (!endDate.length) {
        return new Date(val.create_at.slice(0, 10)).getTime() >= start;
      }

      //Filter if both values not null
      return (
        new Date(val.create_at.slice(0, 10)).getTime() >= start &&
        new Date(val.create_at.slice(0, 10)).getTime() <= end
      );
    });
    const result3 = dataMoney.filter((val) => {
      console.log(dataMoney);
      //Filter if start value null
      if (!startDate.length) {
        return new Date(val.update_at.slice(0, 10)).getTime() <= end;
      }

      //Filter if end value null
      if (!endDate.length) {
        return new Date(val.update_at.slice(0, 10)).getTime() >= start;
      }

      //Filter if both values not null
      return (
        new Date(val.update_at.slice(0, 10)).getTime() >= start &&
        new Date(val.update_at.slice(0, 10)).getTime() <= end
      );
    });

    console.log(result3);

    setFilteredData(result);
    setFilteredSold(result2);
    setFilteredProfit(result3);
    setFilteredCost(result3);
    setFilteredRevenue(result3);
    var xz = 0;
    var xy = 0;
    var xx = 0;
    var z = filteredProfit.map((x) => {
      xz += x.total_profit;
    });
    var y = filteredProfit.map((x) => {
      xy += x.total_cost;
    });
    var x = filteredProfit.map((x) => {
      xx += x.revenue;
    });
    setFilteredProfit2(xz);
    setFilteredCost2(xy);
    setFilteredRevenue2(xx);
    setDateFilter(true);
    setPage(1);
  };

  useEffect(() => {
    Axios.get(API_URL + `/products/log`)
      .then((respond) => {
        setData(respond.data);
        let data = respond.data[0];
      })
      .catch((error) => console.log(error));
    Axios.get(API_URL + `/products/sold`)
      .then((respond) => {
        setSold(respond.data);
        console.log(respond.data);
      })
      .catch((error) => console.log(error));
    Axios.get(API_URL + `/products/total`)
      .then((respond) => {
        let profit = 0;
        let revenue = 0;
        let cost = 0;
        const sum = respond.data.map((x) => {
          profit += x.total_profit;
          revenue += x.revenue;
          cost += x.total_cost;
          console.log(profit);
        });

        setDataMoney(respond.data);
        console.log(respond.data);

        setTotalProfit(profit);
        setTotalRevenue(revenue);
        setTotalCost(cost);
        console.log("Profit :", totalProfit);
        console.log("Revenue :", totalRevenue);
        console.log("Cost :", totalCost);
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
    setPage(1);
  }, [data]);

  useEffect(() => {
    Axios.get(API_URL + `/products/sold`)
      .then((respond) => {
        setSold(respond.data);
        console.log(respond.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    //Set pagination
    const startIndex = 0 + itemPerPage * (page - 1);
    setIndexStartItem(startIndex);

    //Check page
    console.log("current page:", page);
  }, [page]);

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 5;
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

  const renderReport = () => {
    const showData = dateFilter ? filteredData : data;
    console.log(showData);
    return showData
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((data, no) => {
        var createDate = new Date(data.create_at).toLocaleDateString("id");
        var createTime = new Date(data.create_at).toLocaleTimeString("id");
        var updateDate = new Date(data.update_at).toLocaleDateString("id");
        var updateTime = new Date(data.update_at).toLocaleTimeString("id");
        var noID = no + 1 + itemPerPage * (page - 1);

        return (
          <tr key={data.id}>
            <td>{noID}</td>
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
    const showData2 = dateFilter ? filteredSold : sold;
    console.log(showData2);
    return showData2.slice(0, 3).map((sold, no) => {
      console.log(sold);
      return (
        <tr key={{}}>
          <td>{sold.product_name}</td>
          <td>{sold.jumlah || sold.qty}</td>
        </tr>
      );
    });
  };

  const theProfit = () => {
    const showData = dateFilter ? filteredProfit2 : totalProfit;
    return showData;
  };
  const theCost = () => {
    const showData = dateFilter ? filteredCost2 : totalCost;
    return showData;
  };
  const theRevenue = () => {
    const showData = dateFilter ? filteredRevenue2 : totalRevenue;
    return showData;
  };

  return (
    <div>
      {/* --------------------------- Main ------------------------------*/}

      <main id="main">
        <div className="w-50 mx-auto">
          <h4 className="color-text me-5 mt-4 mb-2 text-center">Filter Date</h4>
          <Form.Group className="d-flex mx-auto mb-4 ms-4">
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
        </div>
        <div className="table">
          <Table striped bordered hover size="sm">
            <thead>
              <div className="container-report">
                <div>
                  <div>
                    <h2 className="color-text">Profit</h2>
                  </div>
                  <div
                    style={{
                      marginTop: "10%",
                    }}
                  >
                    <h4>{formatter.format(theProfit())}</h4>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      marginBottom: "25%",
                    }}
                  >
                    <div>
                      <h5 className="color-text">Revenue</h5>
                    </div>
                    <div>{formatter.format(theRevenue())}</div>
                  </div>
                  <div>
                    <div>
                      <h5 className="color-text">Cost</h5>
                    </div>
                    <div>{formatter.format(theCost())}</div>
                  </div>
                </div>
              </div>

              <tr>
                <h5>Top 3 Most Sold</h5>
              </tr>
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
