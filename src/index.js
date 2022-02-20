import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "bootstrap/dist/css/bootstrap.min.css";

// main component
import Main from "./main";

import userReducer from "./reducers/user-reducer";
import productsReducer from "./reducers/products-reducer";

// combine all reducer
const allReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
});

// craete global storage
const STORE = createStore(
  allReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

ReactDOM.render(
  <Provider store={STORE}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
