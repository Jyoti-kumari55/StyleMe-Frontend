import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CART_BASE_URL = "https://project-1-backend-delta.vercel.app";
// const CART_BASE_URL = "http://localhost:3000";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  try {
    const response = await axios.get(`${CART_BASE_URL}/carts/${userId}`);
    return response.data;
  } 
  // catch (error) {
  //   throw Error(error.response.data.message || error.message);
  // }

  catch (error) {
    if (error.response?.status === 404) {
      const createCartResponse = await axios.post(`${CART_BASE_URL}/carts`, { userId });
      return createCartResponse.data;  
    }
    throw Error(error.response.data.message || error.message);
  }
});

// Add product to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, product }) => {
    try {
      const response = await axios.post(
        `${CART_BASE_URL}/carts/${userId}/products`,

        {
          productId: product._id,
          quantity: 1,
        }
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

// Remove product from cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.delete(
        `${CART_BASE_URL}/carts/${userId}/products/${productId}`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

// Move product to wishlist
export const moveToWishlistFrmCart = createAsyncThunk(
  "cart/moveToWishlistFrmCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        `${CART_BASE_URL}/carts/${userId}/products/${productId}/moveToWishlist`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

// Increment product quantity in cart
export const itemQunatityIncrementInCart = createAsyncThunk(
  "cart/itemQunatityIncrementInCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        `${CART_BASE_URL}/carts/${userId}/products/${productId}/increaseItem`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

// Decrement product quantity in cart
export const itemQunatityDecrementInCart = createAsyncThunk(
  "cart/itemQunatityDecrementInCart",
  async ({ userId, productId }) => {
    try {
      const response = await axios.post(
        `${CART_BASE_URL}/carts/${userId}/products/${productId}/decreaseItem`
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

//Clear out the cart page
export const clearCartAPI = createAsyncThunk(
  "cart/clearCartAPI",
  async (userId) => {
    try {
      const response = await axios.delete(`${CART_BASE_URL}/carts/${userId}`);
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message || error.message);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {
      items: [],
    },
    totalQuantity: 0,
    status: "idle",
    error: null,
  },

  reducers: {
    clearCart: (state) => {
      state.cartItems.items = [];
      state.totalQuantity = 0;
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading...";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "success";
      state.cartItems.items = action.payload.products;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      console.error("Error fetching cart:", action.error.message);
      state.error = action.error.message;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      const item = state.cartItems.items.find(
        (item) => item.productId._id === action.meta.arg.product._id
      );
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.items.push({
          productId: action.meta.arg.product,
          quantity: 1,
        });
      }
    });

    builder.addCase(removeFromCart.fulfilled, (state, action) => {
      state.cartItems.items = state.cartItems.items.filter(
        (item) => item.productId._id !== action.meta.arg.productId
      );
    });

    builder.addCase(moveToWishlistFrmCart.fulfilled, (state, action) => {
      state.cartItems.items = state.cartItems.items.filter(
        (item) => item.productId._id !== action.meta.arg.productId
      );
    });

    builder.addCase(itemQunatityIncrementInCart.fulfilled, (state, action) => {
      const product = state.cartItems.items.find(
        (item) => item.productId._id === action.meta.arg.productId
      );
      if (product) {
        product.quantity += 1;
        state.totalQuantity += 1;
      }
    });

    builder.addCase(itemQunatityDecrementInCart.fulfilled, (state, action) => {
      const product = state.cartItems.items.find(
        (item) => item.productId._id === action.meta.arg.productId
      );
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
          state.totalQuantity -= 1;
        } else {
          state.cartItems.items = state.cartItems.items.filter(
            (item) => item.productId._id !== action.meta.arg.productId
          );
          state.totalQuantity -= 1;
        }
      }
    });

    builder.addCase(clearCartAPI.fulfilled, (state, action) => {
      state.cartItems.items = [];
      state.totalQuantity = 0;
    });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
