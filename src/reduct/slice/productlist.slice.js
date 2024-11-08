import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productlist: [],
  error: null,
};



export const getproductlist = createAsyncThunk("productlist/get", async (page) => {
    console.log("disdeuj",page);
    
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/product/getprodct?page=${page}&pageSize=10`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});


export const filterdata = createAsyncThunk("productfilter/post",async (data) => {
  try {
    console.log(data)
    
  } catch (error) {
    console.log(error)
  }
})

const productlisteSlice = createSlice({
  name: "productlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getproductlist.fulfilled, (state, action) => {
        console.log(state)
        state.productlist = action.payload;
      })
      .addCase(filterdata.fulfilled, (state,action)=>{
state.productlist = action.payload;
      });
  },
});

export default productlisteSlice.reducer;
