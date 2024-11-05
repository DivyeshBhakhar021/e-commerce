import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productlist: [],
  error: null,
};



export const getproductlist = createAsyncThunk("productlist/get", async () => {
    console.log("disdeuj");
    
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

const productlisteSlice = createSlice({
  name: "productlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getproductlist.fulfilled, (state, action) => {
      state.product = action.payload;
    });
  },
});

export default productlisteSlice.reducer;
