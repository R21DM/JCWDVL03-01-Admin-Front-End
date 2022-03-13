import Axios from "axios";
import { GET_PRODUCTS } from "./types";
const API_URL = process.env.REACT_APP_API_URL;

var search = "";
var category = "";
var minPrice = null;

const getProducts = (param) => {
  return async (dispatch) => {
    try {
      console.log("search", search);
      console.log("category", category);
      search = param;
      let query =
        param === "" ? "/products/get" : `/products/get?name=%${param}%`;

      if (category) {
        query = `/products/get?name=%${search}%&type=${
          category === "" ? "" : category
        }`;

        if (minPrice) {
          query = `/products/get?name=%${search}%&type=${
            category === "" ? "" : category
          }&minPrice=${minPrice}`;
        }
      }
      if (minPrice) {
        query = `/products/get?name=%${search}%&minPrice=${minPrice}`;

        if (category) {
          query = `/products/get?name=%${search}%&type=${
            category === "" ? "" : category
          }&minPrice=${minPrice}`;
        }
      }
      const respond = await Axios.get(API_URL + query);
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
      let query = x === "" ? `/products/get` : `/products/get?type=${category}`;
      if (search) {
        query = `/products/get?name=%${search}%&type=${
          category === "" ? "" : category
        }`;

        if (minPrice) {
          query = `/products/get?name=%${search}%&type=${
            category === "" ? "" : category
          }&minPrice=${minPrice}`;
        }
      }
      if (minPrice) {
        query = `/products/get?type=${
          category === "" ? "" : category
        }&minPrice=${minPrice}`;

        if (search) {
          query = `/products/get?name=%${search}%&type=${
            category === "" ? "" : category
          }&minPrice=${minPrice}`;
        }
      }
      const respond = await Axios.get(API_URL + query);
      console.log("search", search);
      console.log("category", category);
      console.log("respond", respond);
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

        if (category) {
          query = `/products/get?name=%${search}%&type=${
            category === "" ? "" : category
          }&minPrice=${minPrice}`;
        }
      }
      if (category) {
        query = `/products/get?type=${
          category === "" ? "" : category
        }&minPrice=${minPrice}`;

        if (search) {
          query = `/products/get?name=%${search}%&type=${
            category === "" ? "" : category
          }&minPrice=${minPrice}`;
        }
      }

      const respond = await Axios.get(API_URL + query);
      console.log("respond", respond);
      dispatch({ type: GET_PRODUCTS, payload: respond.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getProducts, categoryProducts, minPriceFilter };
