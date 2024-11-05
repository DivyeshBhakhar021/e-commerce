import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  category: [],
  error: null,
};

export const getcategory = createAsyncThunk("category/get", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/v1/categories/list_categories"
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});




const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getcategory.fulfilled, (state, action) => {
      console.log(state, "fewfhyeuh");
      state.category = action.payload;
    });
  },
});
   

export default CategorySlice.reducer;
