import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { clearCartAPI } from "../features/cartSlice";

const CheckOut = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems.items);
  // const cartProduct = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { address } = location.state || {};

  const totalQuantity = cartItems.reduce(
    (accumulator, currQuantity) => currQuantity.quantity + accumulator,
    0
  );

  const totalPrice = cartItems.reduce(
    (accumulator, currPrice) =>
      currPrice.productId.price * currPrice.quantity + accumulator,
    0
  );

  const deliveryPrice = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
  const promotionPrice =
    totalPrice >= 3000 ? Math.floor(Math.random() * (200 - 50 + 1)) + 50 : 0;

  const handleCheckout = () => {
    if (!address) {
      alert("Please select your address before proceeding to checkout.");
      return;
    }

    dispatch(clearCartAPI(user._id));
    // console.log("Cart state after clearing:", cartItems);
    localStorage.removeItem("cartItems");
    navigate("/orderNow");
  };
  useEffect(() => {
    // console.log("Updated Cart state after clearing:", cartItems);
  }, [cartItems, dispatch]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="card w-50">
          <div className="card-body">
            <h5 className="card-title">Delivered to: </h5>
            <p className="card-text">
              {" "}
              {address ? (
                <p>
                  {address.fullAddress}, {address.locality}, {address.city},{" "}
                  {address.pinCode}
                </p>
              ) : (
                "No address selected"
              )}
            </p>
            <h5 className="card-title">Order Summary</h5>
            <hr />
            <p className="card-text">
              {" "}
              Items:
              <span className="float-end"> {totalQuantity}</span>{" "}
            </p>
            <p className="card-text">
              {" "}
              Delivery:
              <span className="float-end">₹{deliveryPrice} </span>{" "}
            </p>
            <p className="card-text">
              {" "}
              Total Price:
              <span className="float-end">₹{totalPrice} </span>{" "}
            </p>
            <p className="card-text">
              {" "}
              Promotion Applied:
              <span className="float-end">- ₹{promotionPrice} </span>{" "}
            </p>
            <hr />
            <p className="text-danger fs-5">
              {" "}
              Order Total:{" "}
              <span className="float-end">
                {" "}
                {totalPrice + deliveryPrice - promotionPrice}{" "}
              </span>{" "}
            </p>
            <div className="d-flex justify-content-between">
              <Link className="btn btn-warning" to="/cart">
                {" "}
                Back to cart{" "}
              </Link>
              {/* <Link className="btn btn-success" to="/orderNow">
                {" "}
                Proceed to Checkout{" "}
              </Link> */}
              <button className="btn btn-success" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CheckOut;

//₹
