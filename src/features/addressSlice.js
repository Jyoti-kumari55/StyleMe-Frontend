import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const ADDRESS_BASE_URL = "https://project-1-backend-delta.vercel.app";

export const fetchAddresses = createAsyncThunk(
  "address/fetchAddresses",
  async (userId) => {
    try {
      const response = await axios.get(
        `${ADDRESS_BASE_URL}/users/${userId}/address`
      );
      console.log("Address ff", response);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

// export const fetchAddresses = createAsyncThunk(
//   "address/fetchAddresses",
//   async (userId) => {
//     try {
//       const response = await axios.get(
//         `${ADDRESS_BASE_URL}/users/${userId}/address`
//       );
//       console.log("Address ff", response);
//       return response.data;
//     } catch (error) {
//       throw Error(error.response.data.message || error.message);
//     }
//   }
// );
export const addAddresses = createAsyncThunk(
  "address/addAddresses",
  async ({ userId, userDetails }) => {
    try {
      const response = await axios.post(
        `${ADDRESS_BASE_URL}/users/${userId}/address`,
        userDetails
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const updateAddresses = createAsyncThunk(
  "address/updateAddresses",
  async ({ id, updatedAddress }) => {
    try {
      const response = await axios.put(
        `${ADDRESS_BASE_URL}/address/${id}`,
        updatedAddress
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "address/deleteAddress",
  async (id) => {
    try {
      const response = await axios.delete(`${ADDRESS_BASE_URL}/address/${id}`);
      return id;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressArr: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.status = "success";
      state.addressArr = action.payload;
      //console.log("action paylod", action.payload);
    });
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addAddresses.fulfilled, (state, action) => {
      state.addressArr.push(action.payload);
    });
    builder.addCase(updateAddresses.fulfilled, (state, action) => {
      const index = state.addressArr.findIndex(
        (address) => address._id === action.payload._id
      );
      if (index !== -1) {
        state.addressArr[index] = action.payload;
      }
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addressArr = state.addressArr.filter(
        (address) => address._id !== action.meta.arg
      );
    });
  },
});

export const { selectAdd } = addressSlice.actions;
export default addressSlice.reducer;
