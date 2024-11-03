import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import CategorySlice from "../reduct/slice/category.slice";
import productSlice from "../reduct/slice/product.sllice"

export default combineReducers({
  form: formReducer,
  categorydata: CategorySlice,
  productdata: productSlice,
});
