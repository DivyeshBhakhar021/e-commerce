import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  isLoading: false,
  category:[],
  error:null
};

export const getcategory = createAsyncThunk("category/get",async ()=> {
    const response = await axios.get("http://localhost:5000/api/v1/categories/list_categories");
    const data = response.data.data;
    console.log(data);
    return data;
});

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
      .addCase(getcategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    });
  }
});

export default  CategorySlice.reducer;
