import { combineReducers } from "redux";
import CategorySlice from '../slice/category.slice'


export const rootReducer = combineReducers({
  categorydata: CategorySlice,
});