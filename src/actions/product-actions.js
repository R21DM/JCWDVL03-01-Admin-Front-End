import Axios from "axios";
import { GET_PRODUCTS } from "./types";
const API_URL = process.env.REACT_APP_API_URL;

var search = "";
var category = "";
var minPrice = null;
var sort = null;

const getProducts = (param) => {
  return async (dispatch) => {
    try {
      console.log("search", search);
      console.log("category", category);
      search = param;
      let query =
        param === "" ? "/products/get" : `/products/get?name=%${param}%`;

      if (category) {
        query += `&type=${category}`;
      }
      if (minPrice) {
        query += `&minPrice=${minPrice}`;
      }
      if (sort) {
        param === "" ? (query += `?sort=${sort}`) : (query += `&sort=${sort}`);
      }

      const respond = await Axios.get(API_URL + query);
      console.log("query", query);
      // console.log("respond", respond);
      dispatch({ type: GET_PRODUCTS, payload: respond.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const categoryProducts = (x) => {
  return async (dispatch) => {
    try {
      category = x;
      let query = `/products/get?type=${x}`;
      if (search) {
        query += `&name=%${search}%`;
      }
      if (minPrice) {
        query += `&minPrice=${minPrice}`;
      }
      if (sort) {
        query += `&sort=${sort}`;
      }
      const respond = await Axios.get(API_URL + query);
      console.log("search", search);
      console.log("category", category);
      console.log("respond", respond);
      console.log("query", query);
      dispatch({ type: GET_PRODUCTS, payload: respond.data });
    } catch (error) {
      console.log(error);
    }
  };
};
const minPriceFilter = (x) => {
  return async (dispatch) => {
    try {
      console.log("search", search);
      console.log("minPrice", minPrice);
      minPrice = x;
      let query = x === "" ? `/products/get` : `/products/get?minPrice=${x}`;

      if (search) {
        query = `/products/get?name=%${search}%&minPrice=${x}`;
      }
      if (category) {
        query += `&type=${category}`;
      }
      if (sort) {
        x === "" ? (query += `?sort=${sort}`) : (query += `&sort=${sort}`);
      }

      const respond = await Axios.get(API_URL + query);
      console.log("respond", respond);
      console.log("query", query);
      dispatch({ type: GET_PRODUCTS, payload: respond.data });
    } catch (error) {
      console.log(error);
    }
  };
};

const sortFilter = (x) => {
  sort = x;
  return async (dispatch) => {
    try {
      let query =
        search === ""
          ? `/products/get?sort=${sort}`
          : `/products/get?name=%${search}%&sort=${sort}`;

      if (category) {
        query += `&type=${category}`;
      }
      if (minPrice) {
        query += `&minPrice=${minPrice}`;
      }

      const respond = await Axios.get(API_URL + query);
      console.log("query", query);
      // console.log("respond", respond);
      dispatch({ type: GET_PRODUCTS, payload: respond.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getProducts, categoryProducts, minPriceFilter, sortFilter };
