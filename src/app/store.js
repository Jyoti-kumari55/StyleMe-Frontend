import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "../features/addressSlice";
import cartSlice from "../features/cartSlice";
import productsSlice from "../features/productsSlice";
import userSlice from "../features/userSlice";
import whislistSlice from "../features/whislistSlice";

const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    whislist: whislistSlice,
    user: userSlice,
    address: addressSlice,
  },
});

export default store;
