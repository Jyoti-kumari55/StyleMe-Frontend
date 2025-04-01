import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  fetchCart,
  itemQunatityDecrementInCart,
  itemQunatityIncrementInCart,
  moveToWishlistFrmCart,
  removeFromCart,
} from "../features/cartSlice";
import AddressView from "./AddressView";
import { toast, ToastContainer } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const cartItems = useSelector((state) => state.cart.cartItems.items);
  const status = useSelector((state) => state.cart.status);
  const error = useSelector((state) => state.cart.error);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      console.log("Fetching cart for user:", user._id);
      dispatch(fetchCart(user._id));
    }
  }, [dispatch, isAuthenticated, user, navigate]);



  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart({ userId: user._id, productId }));
    toast.success("Product removed from your Cart Successfully...");
  };

  const incrementHandler = (productId) => {
    dispatch(itemQunatityIncrementInCart({ userId: user._id, productId }));
    toast.success("Product quantity Increased by 1.");
  };

  const decrementHandler = (productId) => {
    dispatch(itemQunatityDecrementInCart({ userId: user._id, productId }));
    toast.success("Product quantity Decreased by 1.");
  };

  const moveToWishlistClickHandler = async (productId) => {
    await dispatch(moveToWishlistFrmCart({ userId: user._id, productId }));
    toast.success("Product moved to the Wishlist...");
    // navigate("/whislist");
  };

  const totalQuantity = cartItems.reduce(
    (accumulator, currQuantity) => currQuantity.quantity + accumulator,
    0
  );

  const totalPrice = cartItems.reduce(
    (accumulator, currPrice) =>
      currPrice.productId.price * currPrice.quantity + accumulator,
    0
  );

  const handleProceedToCheckout = () => {
    const allSizesSelected = cartItems.every(
      (item) => selectedSizes[item.productId._id] !== undefined
    );

    if (!selectedAddress) {
      toast.error("Please select an address before proceeding.");
      return;
    }
    
    if (!allSizesSelected) {
      toast.error("Please select a size for all products before proceeding.");
      return;
    }

    navigate("/checkout", { state: { address: selectedAddress } });
  };

  return (
    <>
      <Header />
      <div className="m-5">
        <p className="fs-2">
          Cart{" "}
          <span className="fs-4 ">
            {" "}
            ({cartItems && cartItems.length} products){" "}
          </span>
          <button
            className="btn btn-outline-success float-end fs-5"
            onClick={handleProceedToCheckout}
          >
            {" "}
            Proceed to Buy ({totalQuantity} items)
          </button>
        </p>


        <div className="row">
          <div className="col-md-3">
            <AddressView onSelectAddress={setSelectedAddress} />
          </div>

          <div className="col-md-9 pl-4">
           
            {cartItems.length > 0 ? (
              <div className="row">
                {status === "loading" && <p>Loading cart products...</p>}
                {error && (
                  <p>
                    An error occured while fetching the cart products- {error}
                  </p>
                )}

                {cartItems?.map((item) => (
                  <div className="mb-3" key={item.productId._id}>
                    <div className="card">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={item.productId.imageUrl}
                            className="img-fluid "
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            alt={item.productId.name}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body text-center">
                            <h5 className="card-title">
                              {item.productId.name}
                            </h5>
                            <p className="card-text">₹{item.productId.price}</p>

                            <div className="form-group">
                              <label
                                htmlFor={`sizeSelect-${item.productId._id}`}
                                className="form-label mx-2"
                              >
                                Select Size:
                              </label>
                              <select
                                id={`sizeSelect-${item.productId._id}`}
                                value={selectedSizes[item.productId._id] || ""}
                                className="rounded"
                                onChange={(e) =>
                                  setSelectedSizes((prev) => ({
                                    ...prev,
                                    [item.productId._id]: e.target.value,
                                  }))
                                }
                              >
                                <option value="" disabled>
                                  Size
                                </option>
                                {item.productId.size.map((size) => (
                                  <option key={size} value={size}>
                                    {size}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="d-flex justify-content-center align-items-center">
                              <button
                                onClick={() =>
                                  decrementHandler(item.productId._id)
                                }
                                className="btn btn-outline-secondary mx-1"
                              >
                                -
                              </button>
                              <span className="btn btn-light">
                                Qty: {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  incrementHandler(item.productId._id)
                                }
                                className="btn btn-outline-secondary mx-1"
                              >
                                +
                              </button>
                            </div>
                            <div className="d-flex justify-content-center m-4">
                              <button
                                className="btn btn-danger mx-4"
                                onClick={() =>
                                  removeFromCartHandler(item.productId._id)
                                }
                              >
                                Remove
                              </button>
                              <button
                                className="btn btn-warning"
                                onClick={() =>
                                  moveToWishlistClickHandler(item.productId._id)
                                }
                              >
                                Move to Wishlist
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center fs-3 fw-bold">Your Cart Is Empty.</p>
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="row">
            <div className="col-md mt-4 d-flex justify-content-end">
              <div className="card w-50 bg-light">
                <div className="card-body">
                  <h5 className="card-title">
                    PRICE DETAILS{" "}
                    <span className="float-end">({totalQuantity} items) </span>
                  </h5>
                  <hr />
                  {cartItems.map((item) => (
                    <div key={item._id}>
                      <p className="card-text mb-1">
                        {item.productId.name} - {item.quantity} Size:{" "}
                        {selectedSizes[item.productId._id] || "Not selected"}
                        <span className="float-end">
                          {" "}
                          ₹{item.productId.price * item.quantity}{" "}
                        </span>
                      </p>
                    </div>
                  ))}
                  <hr />
                  <p className="">
                    Total Price:{" "}
                    <span className="float-end">₹{totalPrice} </span>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer /> 
    </>
  );
};

export default Cart;
