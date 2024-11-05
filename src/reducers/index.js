import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import CategorySlice from "../reduct/slice/category.slice";
import productSlice from "../reduct/slice/product.sllice"
import cartSlice from "../reduct/slice/cart.slice"
import productlisteSlice from "../reduct/slice/productlist.slice";

export default combineReducers({
  form: formReducer,
  categorydata: CategorySlice,
  productdata: productSlice,
  cartdata: cartSlice,
  productlist: productlisteSlice,
});
