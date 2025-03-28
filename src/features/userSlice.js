import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const USER_BASE_URL = "https://project-1-backend-delta.vercel.app";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  try {
    const response = await axios.get(`${USER_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw Error(error.response?.data?.message || error.message);
  }
});

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userDetails) => {
    try {
      const response = await axios.post(`${USER_BASE_URL}/users`, userDetails);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, updateUserData }) => {
    try {
      const response = await axios.put(
        `${USER_BASE_URL}/users/${userId}`,

        updateUserData
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId) => {
    try {
      const response = await axios.delete(`${USER_BASE_URL}/users/${userId}`);
      return userId;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

// Login user
export const loginUsers = createAsyncThunk(
  "user/loginUsers",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${USER_BASE_URL}/login`,
        userCredentials
      );
      return response.data;
    } catch (error) {
      // throw new Error("Invalid Credentials!!");
      return rejectWithValue(error.response?.data?.message || "iindjjjhi");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || {},
    users: [],
    status: "idle",
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    error: null,
  },
  reducers: {
    // loginUser: (state, action) => {
    //   state.isAuthenticated = true;
    //   state.user = action.payload;
    // },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("user");
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   state.status = "success";
    //   state.user = action.payload;
    // });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
      // console.log("action paylod", action.payload);
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //Create User
    builder.addCase(createUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = "success";
      state.users.push(action.payload);
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    //Update User
    builder.addCase(updateUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    });

    builder.addCase(loginUsers.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });

    builder.addCase(loginUsers.rejected, (state, action) => {
      state.status = "error";
      // state.error = action.error.message;
      state.error = action.payload;
    });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
