/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Header from "../components/Header";
import { addToCart } from "../features/cartSlice";
import { addToWhislist } from "../features/whislistSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const productId = useParams();

  // console.log("User ID:", user._id);

  const productInfo = products?.find(
    (product) => product._id === productId.productId
  );
  // console.log("Product Info", productInfo);


  const addToCartHandler = (productInfo) => {
    dispatch(addToCart({ userId: user._id, product: productInfo }));
    toast.success("Product added to your Cart Successfully...");
    setTimeout(() => {
    }, 1000);
    navigate("/cart");
  };

  const addToWhistlistHandler = (productInfo) => {
    dispatch(addToWhislist({ userId: user._id, product: productInfo }));
    toast.success("Product added to your Wishlist Successfully...");
    setTimeout(() => {
    }, 1000);
    navigate("/whislist");
  };

  return (
    <>
      <Header />
      <main>
        <div className="container mt-4">
          {status === "loading" && <p>Fetching product details</p>}
          {error && (
            <p>An error occurred while fetching the product details.</p>
          )}
          <Link to="/cloth/All" className="btn btn-primary px-3">
            Back{" "}
          </Link>
          {productInfo && (
            <div className="row mt-5 mb-5">
              <div className="col-md-6 d-flex justify-content-start align-items-start mb-4">
                <img
                  src={productInfo.imageUrl}
                  alt={productInfo.name}
                  className="img-fluid rounded-5"
                  style={{ width: "80%", maxWidth: "500px", height: "auto" }} 
                />
              </div>

              <div className="col-md-6 d-flex flex-column justify-content-start align-items-start mt-2">
                <h2>{productInfo.brand}</h2>
                <p className="fs-4">{productInfo.name}</p>

                <div className="position-relative ">
                  <div
                    style={{
                      width: "4rem",
                      height: "2rem",
                      backgroundColor: "green",
                      color: "white",
                      padding: "4px",
                      fontWeight: "bold",
                      borderRadius: "6px",
                    }}
                  >
                    {productInfo.rating}
                    <span style={{ padding: "0 5px", marginLeft: "4px" }}>
                      <img
                        src="https://assets.ajio.com/static/img/green_star_pdp.svg"
                        className="img-fluid"
                        style={{
                          width: "12px",
                          height: "14px",
                          marginBottom: "4px"
                        }}
                      />
                    </span>
                  </div>
                </div>

                <p className="fs-4 mt-3">₹{productInfo.price}</p>
                <p className="fs-6">
                  Available Color: {productInfo.color.join(", ")}
                </p>
                <p className="fs-6 text-center">
                  <b>Available Size</b>
                </p>
                <div className="d-flex flex-wrap mb-3">
                  {productInfo.size.map((userSize) => (
                    <button
                      key={userSize}
                      style={{
                        flexWrap: "wrap",
                        width: "5rem",
                        margin: "6px 10px",
                        borderRadius: "10px",
                        backgroundColor: "#f1f1f1",
                        border: "1px solid black",
                      }}
                    >
                      {userSize}
                    </button>
                  ))}
                </div>

                <div className="d-flex justify-content-start gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => addToCartHandler(productInfo)}
                  >
                    Add To Bag
                  </button>

                  <button
                    className="btn btn-warning"
                    onClick={() => addToWhistlistHandler(productInfo)}
                  >
                    Add To Wishlist
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer/>
      </main>
    </>
  );
};

export default ProductDetail;
