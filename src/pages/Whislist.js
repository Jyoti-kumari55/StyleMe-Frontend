import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  addToCartFromWhishlist,
  fetchWhislist,
  removeFromWhislist,
} from "../features/whislistSlice";
import { toast, ToastContainer } from "react-toastify";


const Whislist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const whislistItem = useSelector((state) => state.whislist.whislist.items);
  // console.log(whislistItem);
  const status = useSelector((state) => state.whislist.status);
  const error = useSelector((state) => state.whislist.error);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(fetchWhislist(user._id));
    }
  }, [dispatch, isAuthenticated, navigate, user]);


  const removeFromWhislistHandler = (productId) => {
    dispatch(removeFromWhislist({ userId: user._id, productId }));
    toast.success("Product removed from your Wishlist Successfully...");
    setTimeout(() => {
      navigate(0); 
    }, 1000); 
  };

  const addToCartClickHandler = async (productId) => {
    await dispatch(addToCartFromWhishlist({ userId: user._id, productId }));
    toast.success("Product added to the Cart...");
    setTimeout(() => {
      navigate("/cart");
    }, 1000); 
  };

  // const [wishlistState, setWishlistStates] = useState({});
  // useEffect(() => {
  //   const wishlistState = whislistItem.reduce((acc, item) => {
  //     acc[item.productId._id] = true; // Initialize wishlist state from Redux store
  //     return acc;
  //   }, {});
  //   setWishlistStates(wishlistState);
  // }, [dispatch]);

  return (
    <>
      <Header />
      <div className="container">
        <p className="fs-2">
          Wishlist{" "}
          <span className="fs-4">
            {" "}
            ({whislistItem && whislistItem.length} products){" "}
          </span>
        </p>
        {whislistItem.length > 0 ? (
          <div className="row">
            {status === "loading" && <p>Loading cart products...</p>}
            {error && (
              <p>An error occured while fetching the cart products- {error}</p>
            )}
            {/* {Array.isArray(whislistItem) && */}
            {whislistItem?.map((item) => (
              <div className="col-md-3" key={item.productId._id}>
                <div className="card border-0">
                  <div className="text-center">
                    {" "}
                    <img
                      src={item.productId.imageUrl}
                      alt={item.productId.name}
                      style={{ width: "200px" }}
                      className="card-img-top"
                    />
                  </div>
                  <div className="card-body text-center">
                    <p className="card-title">{item.productId.name}</p>
                    <p>₹{item.productId.price}</p>
                    <div
                      className="d-flex justify-content-center gap-2"
                      style={{ flexWrap: "wrap" }}
                    >
                      <button
                        className="btn btn-danger"
                        style={{ flex: "0 0 auto", marginBottom: "10px" }}
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromWhislistHandler(item.productId._id);
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className="btn btn-warning"
                        style={{ flex: "0 0 auto", marginBottom: "10px" }}
                        onClick={() =>
                          addToCartClickHandler(item.productId._id)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center fw-bold">
            <p className="fs-3 ">Your Wishlist Is Empty.</p>
            <p className="fs-4 ">Add your favourites to wishlist </p>
            <Link to="/" className="btn btn-secondary">
              Add to Wishlist
            </Link>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Whislist;
