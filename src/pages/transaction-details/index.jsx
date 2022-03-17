import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Table, Image, Card, ButtonGroup } from "react-bootstrap";
import "./style.css";
import Axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function TransactionDetails() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  //Variable Names
  const [data, setData] = useState([]);
  const { id } = useParams();
  const [dataPlaceholder, setDataPlaceholder] = useState({
    code: "",
    price: 0,
    qty: 0,
    total_price: 0,
  });
  const [deliveryCost, setDeliveryCost] = useState(5000);

  //Get Transactions Data By ID
  const getTxnID = () => {
    Axios.get(API_URL + `/transaction/${id}`)
      .then((respond) => {
        console.log(respond.data);
        setData(respond.data);
        setDataPlaceholder(respond.data[0]);
        setDeliveryCost(
          respond.data[0].shipping === "Regular"
            ? 5000
            : respond.data[0].shipping === "Same Day"
            ? 10000
            : 20000
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //Get all transactions data
    getTxnID();

    const TOKEN = localStorage.getItem("token");
    const KEY = sessionStorage.getItem("key");
    if (!user.id) {
      if (TOKEN || KEY) {
        return;
      } else navigate("../login");
    }
  }, []);

  const renderAllTrx = () => {
    return data.map((val, idx) => {
      const { name, price, qty } = val;
      const displayPrice = `Rp ${price.toLocaleString("id-ID")},-`;
      const total_price = `Rp ${(price * qty).toLocaleString("id-ID")},-`;

      return (
        <tr key={val.id}>
          <td>{idx + 1}</td>
          <td>{name}</td>
          <td>{displayPrice}</td>
          <td>{`${qty} ${dataPlaceholder.unit}`}</td>
          <td>{total_price}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="table">
        <Card>
          <Card.Header className="d-flex justify-content-between ma-2">
            <div className="my-auto w-100">
              <Card.Text>
                <strong>Invoice Code: </strong> {dataPlaceholder.code}
              </Card.Text>
              <Card.Text>
                <strong>Address: </strong>
                {dataPlaceholder.address}
              </Card.Text>
              <Card.Text>
                <strong>City: </strong>
                {dataPlaceholder.city}
              </Card.Text>
              <Card.Text>
                <strong>Delivery Type: </strong>
                {`${
                  dataPlaceholder.shipping
                } - Rp ${deliveryCost.toLocaleString("id-ID")},-`}
              </Card.Text>
              <Card.Text>
                <strong>Total Price: </strong>
                {`Rp ${dataPlaceholder.total_price.toLocaleString("id-ID")},-`}
              </Card.Text>
            </div>
            <div className="w-100 d-flex flex-column align-items-center">
              <div className="center-item fw-bold">Payment Proof</div>
              <Image
                rounded
                src={`${process.env.REACT_APP_API_URL}/products/Ibuprofen.jpg`}
                className="w-50 h-auto"
              />
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>Ordered Items</Card.Title>
            <Table striped bordered hover size="sm" className="bg-light">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>{renderAllTrx()}</tbody>
            </Table>
            <div className="w-100 d-flex justify-content-center">
              <Button className="me-2 w-25" variant="success">
                Approve
              </Button>
              <Button className="me-2 w-25" variant="danger">
                Reject
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex justify-content-center py-2">
        <Button onClick={() => navigate("../transaction")}>
          Back to Transaction
        </Button>
      </div>
    </div>
  );
}

export default TransactionDetails;
