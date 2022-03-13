import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  categoryProducts,
  minPriceFilter,
} from "../../actions/product-actions";
import { Button, Card, Form, FormControl, Table, Modal } from "react-bootstrap";
import "../product/style.css";

const API_URL = process.env.REACT_APP_API_URL;

function Product(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { products } = useSelector((state) => {
    return {
      products: state.products.data,
    };
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [syringe, setSyringe] = useState(true);
  const [pill, setPill] = useState(true);
  const [table, setTable] = useState(true);
  const [del, setDel] = useState(false);
  const [delID, setDelID] = useState(null);

  useEffect(() => {
    Axios.get(API_URL + `/products/get`)
      .then((respond) => {
        // console.log(respond.data);
        dispatch(getProducts(""));
        setLoading(false);
      })
      .catch((error) => console.log(error));

    const TOKEN = localStorage.getItem("token");
    if (!user.id) {
      if (TOKEN) {
        setLoading(true);
        return;
      } else navigate("../login");
    }
  }, []);

  const onButtonSearch = () => {
    navigate("/product");
    dispatch(getProducts(search));
    setLoading(false);
  };

  const deleteData = () => {
    setDel(true);
  };

  const renderListProducts = () => {
    console.log("Productnya", products);
    return products.map((product) => {
      return (
        <Card key={product.id} id="product-card">
          <Card.Img
            variant="top"
            src={`${process.env.REACT_APP_API_URL}/products/${product.name}.jpg`}
            style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
            width="50%"
            height="50%"
          />
          <Card.Body className="card-body">
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {"Rp. "}
              {product.price}
              {`/${product.unit}`}
            </Card.Text>
            <Button
              variant="primary"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              Check Details
            </Button>
          </Card.Body>
        </Card>
      );
    });
  };

  const renderTableListProducts = () => {
    console.log(products);
    return products.map((product, no) => {
      var createDate = new Date(product.create_at).toLocaleDateString("id");
      var createTime = new Date(product.create_at).toLocaleTimeString("id");
      var updateDate = new Date(product.update_at).toLocaleDateString("id");
      var updateTime = new Date(product.update_at).toLocaleTimeString("id");
      console.log();
      return (
        <tr key={product.id}>
          <td>{no + 1}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.volume}</td>
          <td>{product.volume_per_bottle}</td>
          <td>{product.unit}</td>
          <td>{product.description}</td>
          <td>{product.brand}</td>
          <td>{product.drug_class}</td>
          <td>{product.before_taking}</td>
          <td>{product.dosage}</td>
          <td>{product.type}</td>
          <td>{createDate + "  " + createTime}</td>
          <td>{updateDate + "  " + updateTime}</td>
          <td style={{ display: "flex" }}>
            <Button
              variant="danger"
              onClick={() => deleteData(product.id)}
              style={{ marginRight: "4px" }}
            >
              Delete
            </Button>
            <Button
              variant="warning"
              // onClick={() => editData(product)}
            >
              Edit
            </Button>
          </td>
        </tr>
      );
    });
  };

  const renderTable = () => {
    return (
      <div>
        <Table style={{ fontSize: "10px" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Volume/bottle</th>
              <th>Unit</th>
              <th>Description</th>
              <th>Brand</th>
              <th>Drug Class</th>
              <th>Before Taking</th>
              <th>Dosage</th>
              <th>Type</th>
              <th>Date</th>
              <th>'Date (Updated)'</th>
            </tr>
          </thead>
          <tbody>{renderTableListProducts()}</tbody>
        </Table>
      </div>
    );
  };

  return (
    <div className="color">
      {/* --------------------------- Main ------------------------------*/}

      <main id="main color">
        {/* ------------------------------------- Title -------------------------------------*/}
        <div className="center-item color title">
          <h2>Data Product</h2>
        </div>

        {/* ------------------------------------- Search -------------------------------------*/}
        <div className="center-item color">
          <Form className="d-flex search">
            <FormControl
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-success" onClick={onButtonSearch}>
              Search
            </Button>
            <div className="button-type">
              <Button onClick={() => setTable(false)}>List</Button>
            </div>
            <div className="button-type">
              <Button onClick={() => setTable(true)}>Table</Button>
            </div>
          </Form>
        </div>

        {/* --------------------------- Product  ------------------------------*/}

        <div className="product-container">
          {!table ? (
            <div className="filter">
              <div className="filter-header">
                <h5 className="left1">Filter</h5>
              </div>
              <div className="filter-header2">
                <div className="filter-header-color">
                  <h6 className="left2">Category</h6>
                </div>

                <div className="left2 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexRadioDefault2"
                    checked={syringe}
                    onChange={() => {
                      setSyringe(!syringe);
                      console.log("syringe", !syringe);
                      console.log("pill", pill);
                      if (!syringe) {
                        if (pill && !syringe) {
                          return dispatch(categoryProducts(""));
                        }
                        dispatch(categoryProducts("Syringe"));
                      } else if (!pill && syringe) {
                        dispatch(categoryProducts("none"));
                      } else dispatch(categoryProducts("pill"));
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Syringe
                  </label>
                </div>

                <div className="left2 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexRadioDefault3"
                    checked={pill}
                    onChange={() => {
                      setPill(!pill);
                      console.log("syringe", syringe);
                      console.log("pill", !pill);
                      if (!pill) {
                        if (!pill && syringe) {
                          return dispatch(categoryProducts(""));
                        }
                        dispatch(categoryProducts("pill"));
                      } else if (pill && !syringe) {
                        dispatch(categoryProducts("none"));
                      } else dispatch(categoryProducts("Syringe"));
                    }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Pill
                  </label>
                </div>
              </div>
              <div className="filter-header3">
                <div className="filter-header2 filter-header-color">
                  <h6 className="left3">Price</h6>
                </div>
                <Form.Group className="mb-3 form1">
                  <div>
                    <input
                      type="text"
                      className="form-control form2"
                      placeholder="Min Price"
                      onInput={(e) => {
                        e.target.value = e.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*)\./g, "");
                      }}
                      onChange={(e) => {
                        console.log(e.target.value);
                        return dispatch(minPriceFilter(e.target.value));
                      }}
                    />
                  </div>
                  <div className="price-tag">Rp</div>
                </Form.Group>
              </div>
              <Form.Group className="mb-3 form1" controlId="">
                <div>
                  <input
                    type="text"
                    className="form-control form2"
                    placeholder="Max Price"
                    onInput={(e) => {
                      e.target.value = e.target.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/(\..*)\./g, "");
                    }}

                    // onChange={(e) => {
                    //   console.log(e.target.value);
                    //   return dispatch(minPrice(e.target.value));
                    // }}
                  />
                </div>
                <div className="price-tag">Rp</div>
              </Form.Group>
            </div>
          ) : null}

          <div className="body-feature-product">
            {!table ? renderListProducts() : renderTable()}
          </div>
        </div>
        {/* ---------Delete---------- */}
        <Modal show={del} style={{ width: "20%", marginLeft: "40%" }}>
          <Modal.Header
            closeButton
            onClick={() => {
              setDelID(null);
              setDel(false);
            }}
          >
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>

          {/* <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body> */}

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setDelID(null);
                setDel(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={{}}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}

export default Product;
