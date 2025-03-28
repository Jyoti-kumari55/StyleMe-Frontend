import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get(
        "https://project-1-backend-delta.vercel.app/products"
      );
      // console.log("Rsponse Data: ", response);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);
export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading...";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default productsSlice.reducer;
