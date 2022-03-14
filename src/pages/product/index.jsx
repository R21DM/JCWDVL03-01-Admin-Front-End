import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  categoryProducts,
  minPriceFilter,
} from "../../actions/product-actions";
import {
  Button,
  Card,
  Form,
  FormControl,
  Table,
  Modal,
  Pagination,
  InputGroup,
  Col,
} from "react-bootstrap";
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
  const [upd, setUpd] = useState(false);
  const [delID, setDelID] = useState(null);
  const [selectFile, setSelectFile] = useState();
  const [item, setItem] = useState(null);
  const [itemObj, setItemObj] = useState({
    create_at: undefined,
    update_at: undefined,
  });

  //Pagination

  //Variable Name
  const [page, setPage] = useState(1);
  const [editableItem, setEditableItem] = useState(false);
  const [indexStartItem, setIndexStartItem] = useState(0);

  //Pagination control
  const active = page;
  const items = [];
  const itemPerPage = 8;
  const endPageNumber = Math.ceil(products.length / itemPerPage);
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
    Axios.get(API_URL + `/products/get`)
      .then((respond) => {
        // console.log(respond.data);
        dispatch(getProducts(""));
        setLoading(false);
      })
      .catch((error) => console.log(error));

    const TOKEN = localStorage.getItem("token");
    const KEY = sessionStorage.getItem("key");
    if (!user.id) {
      if (TOKEN || KEY) {
        setLoading(true);
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

  const onButtonSearch = () => {
    navigate("/product");
    dispatch(getProducts(search));
    setLoading(false);
  };

  const deleteData = (x) => {
    setDelID(x);
    setDel(true);
  };
  const delDataConfirm = () => {
    Axios.delete(API_URL + `/products/${delID}`)
      .then((respond) => {
        console.log(respond);
        setDel(false);
        setDelID(null);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  const editData = (product) => {
    setEditableItem(true);
    setItemObj({ ...itemObj, id: `${product.id}` });
    setItem(product);
    console.log(product);
  };

  //On file upload
  const onFileUpload = () => {
    const dataArray = new FormData();
    dataArray.append("uploaded-file", selectFile);
    dataArray.append("filename", selectFile.name);

    console.log(dataArray);

    Axios.post(API_URL, dataArray, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: { id: itemObj.id, name: products[itemObj.id - 1].name },
    })
      .then((respond) => {
        console.log("respond", respond);
        itemObj = {};
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updDatCon = () => {
    if (selectFile) {
      onFileUpload();
    }

    Axios.put(API_URL + `/products/${itemObj.id}`, itemObj)
      .then((respond) => {
        console.log(itemObj);
        setUpd(false);
        itemObj = {};
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        window.location.reload();
      });
  };

  const renderListProducts = () => {
    console.log("Productnya", products);
    return products
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((product) => {
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
    return products
      .slice(indexStartItem, indexStartItem + itemPerPage)
      .map((product) => {
        var createDate = new Date(product.create_at).toLocaleDateString("id");
        var createTime = new Date(product.create_at).toLocaleTimeString("id");
        var updateDate = new Date(product.update_at).toLocaleDateString("id");
        var updateTime = new Date(product.update_at).toLocaleTimeString("id");
        console.log();
        if (item) {
          if (product.id == item.id) {
            return (
              <tr
                key={item.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <td></td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Name
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.name}
                    onChange={(event) => {
                      setItemObj({ ...itemObj, name: `${event.target.value}` });
                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Price
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.price}
                    onChange={(event) => {
                      setItemObj({
                        ...itemObj,
                        price: `${(event.target.value = event.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*)\./g, ""))}`,
                      });

                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Volume
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.volume}
                    onChange={(event) => {
                      setItemObj({
                        ...itemObj,
                        volume: `${(event.target.value = event.target.value
                          .replace(/[^0-9.]/g, "")
                          .replace(/(\..*)\./g, ""))}`,
                      });
                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Volume/bottle
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.volume_per_bottle}
                    onChange={(event) => {
                      setItemObj({
                        ...itemObj,
                        volume_per_bottle: `${(event.target.value =
                          event.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*)\./g, ""))}`,
                      });
                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Unit
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.unit}
                    onChange={(event) => {
                      setItemObj({
                        ...itemObj,
                        unit: `${event.target.value}`,
                      });
                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Filename
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    disabled={true}
                    defaultValue={item.filename}
                  />
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Description
                    </h6>
                  </Form.Label>
                  <InputGroup>
                    <FormControl
                      as="textarea"
                      aria-label="With textarea"
                      type="text"
                      defaultValue={item.description}
                      onChange={(event) => {
                        setItemObj({
                          ...itemObj,
                          description: `${event.target.value}`,
                        });
                        return console.log(itemObj);
                      }}
                    />
                  </InputGroup>
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Brand
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.brand}
                    onChange={(event) => {
                      setItemObj({
                        ...itemObj,
                        brand: `${event.target.value}`,
                      });
                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label style={{ display: "flex", flexDirection: "row" }}>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "0%",
                        marginBottom: "0%",
                      }}
                    >
                      Drug Class
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.drug_class}
                    onChange={(event) => {
                      setItemObj({
                        ...itemObj,
                        drug_class: `${event.target.value}`,
                      });
                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label style={{ display: "flex", flexDirection: "row" }}>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "0%",
                        marginBottom: "0",
                      }}
                    >
                      Before Taking
                    </h6>
                  </Form.Label>
                  <InputGroup>
                    <FormControl
                      as="textarea"
                      aria-label="With textarea"
                      type="text"
                      defaultValue={item.before_taking}
                      onChange={(event) => {
                        setItemObj({
                          ...itemObj,
                          before_taking: `${event.target.value}`,
                        });
                        return console.log(itemObj);
                      }}
                    />
                  </InputGroup>
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Dosage
                    </h6>
                  </Form.Label>
                  <InputGroup>
                    <FormControl
                      as="textarea"
                      aria-label="With textarea"
                      type="text"
                      defaultValue={item.dosage}
                      onChange={(event) => {
                        setItemObj({
                          ...itemObj,
                          dosage: `${event.target.value}`,
                        });
                        return console.log(itemObj);
                      }}
                    />
                  </InputGroup>
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Type
                    </h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.type}
                    onChange={(event) => {
                      setItemObj({
                        ...itemObj,
                        type: `${event.target.value}`,
                      });
                      return console.log(itemObj);
                    }}
                  />
                </td>
                <td>
                  <Form.Label>
                    <h6
                      style={{
                        color: "grey",
                        marginLeft: "5%",
                        marginBottom: "-8%",
                      }}
                    >
                      Image
                    </h6>
                  </Form.Label>
                  <Col sm="10">
                    <input
                      name="uploaded-file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectFile(e.target.files[0])}
                    />
                  </Col>
                </td>
                <td style={{ display: "flex", justifyContent: "center" }}>
                  <Button variant="warning" onClick={() => setItem(null)}>
                    Cancel
                  </Button>
                  <Button
                    style={{ marginLeft: "1%" }}
                    variant="success"
                    onClick={() => setUpd(true)}
                  >
                    Save
                  </Button>
                </td>
              </tr>
            );
          }
        } else
          return (
            <tr key={product.id}>
              <td>{product.id}</td>
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
                <Button variant="warning" onClick={() => editData(product)}>
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
        <Table striped bordered hover size="sm" style={{ fontSize: "10px" }}>
          <thead>
            {!editableItem ? (
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
                <th>Action</th>
              </tr>
            ) : null}
          </thead>
          <tbody>{renderTableListProducts()}</tbody>
        </Table>
      </div>
    );
  };

  return (
    <div className="main-color">
      {/* --------------------------- Main ------------------------------*/}

      <main id="main" className="main-color">
        {/* ------------------------------------- Title -------------------------------------*/}
        <div className="center-item title main-color">
          <h2>Data Product</h2>
        </div>

        {/* ------------------------------------- Search -------------------------------------*/}
        <div className="center-item main-color">
          <Form className="d-flex search">
            <FormControl
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
              variant="outline-success"
              onClick={onButtonSearch}
              className="register-btn"
            >
              Search
            </Button>
            <div className="button-type">
              <Button
                onClick={() => setTable(false)}
                className="register-btn "
                variant="outline-success"
              >
                List
              </Button>
            </div>
            <div className="button-type">
              <Button
                onClick={() => setTable(true)}
                className="register-btn "
                variant="outline-success"
              >
                Table
              </Button>
            </div>
          </Form>
        </div>

        {/* --------------------------- Product  ------------------------------*/}

        <div className="product-container main-color">
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
            <Button variant="primary" onClick={() => delDataConfirm()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* ---------Edit---------- */}
        <Modal show={upd} style={{ width: "20%", marginLeft: "40%" }}>
          <Modal.Header
            closeButton
            onClick={() => {
              setUpd(false);
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
                setUpd(false);
              }}
            >
              Close
            </Button>
            <Button variant="primary" onClick={() => updDatCon()}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
}

export default Product;
