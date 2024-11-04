import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  product: [],
  error: null,
};

export const getproduct = createAsyncThunk("product/get", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/product/list_product"
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const getproductlist = createAsyncThunk("listproduct/get", async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/product/getprodct?page=1&pageSize=10`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    console.log("Ferfyrbf", builder);
    builder
      .addCase(getproduct.fulfilled, (state, action) => {
        console.log(state, "fewfhyeuh");
        state.product = action.payload;
      })
      .addCase(getproductlist.fulfilled,(state,action)=> {
 state.product = action.payload;
      });
  },
});

export default productSlice.reducer;
