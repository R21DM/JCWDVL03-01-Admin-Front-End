import { GET_PRODUCTS } from "../actions/types";

const INITIAL_STATE = {
  data: [],
  loading: false,
};

function productsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}

export default productsReducer;
