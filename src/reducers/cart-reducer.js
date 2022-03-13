import { GET_CART } from "../actions/types";

const INITIAL_STATE = {
  data: {
    result: [
      {
        active: null,
        filename: null,
        id: null,
        name: null,
        price: 0,
        product_id: null,
        qty: null,
        total_price: 0,
        unit: null,
      },
    ],
    totalPrice: 0,
  },
};

function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CART:
      return { ...state, data: action.payload };

    default:
      return state;
  }
}

export default cartReducer;
