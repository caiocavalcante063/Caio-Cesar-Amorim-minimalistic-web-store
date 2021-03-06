import { combineReducers } from "redux";
import currencyReducer from "./currency";
import cartReducer from "./cart";

const rootReducer = combineReducers({
  cart: cartReducer,
  currentCurrency: currencyReducer,
});

export default rootReducer;
