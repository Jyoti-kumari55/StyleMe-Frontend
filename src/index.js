import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "ionicons/dist/css/ionicons.min.css";

import store from "./app/store";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Whislist from "./pages/Whislist";
import AllProducts from "./pages/AllProducts";
import ProductDetail from "./pages/ProductDetail";
import AddressForm from "./pages/AddressForm";
import UserForm from "./pages/UserForm";
import CheckOut from "./pages/CheckOut";
import OrderNow from "./pages/OrderNow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // {
  //   path: "/cloth/All/search",
  //   element: <AllProducts />,
  // },

  {
    path: "/cloth/:genderName",
    element: <AllProducts />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },

  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/whislist",
    element: <Whislist />,
  },
  {
    path: "/user/:userId",
    element: <UserForm />,
  },
  {
    path: "address/:addressId",
    element: <AddressForm />,
  },
  {
    path: "/addressForm",
    element: <AddressForm />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/orderNow",
    element: <OrderNow />,
  },
  {
    path: "/userForm",
    element: <UserForm />,
  },
]);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);



