import Axios from "axios";
import { GET_CART } from "./types";
const API_URL = process.env.REACT_APP_API_URL;

export const getCartData = (id) => {
  return async (dispatch) => {
    try {
      const respond = await Axios.get(API_URL + `/cart`, {
        params: { id },
      });

      dispatch({ type: GET_CART, payload: respond.data });
    } catch (error) {
      console.log(error);
    }
  };
};
