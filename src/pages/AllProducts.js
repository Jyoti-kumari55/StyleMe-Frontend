import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productsSlice";
import { addToCart } from "../features/cartSlice";
import { addToWhislist } from "../features/whislistSlice";

const AllProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  //  console.log("Status", status);
  // const wishlist = useSelector((state) => state.whislist.whislist.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const serchItem = new URLSearchParams(location.search);
  const searchQuery = serchItem.get("query") || " ";
  // console.log("Search Items", searchQuery);

  const { genderName } = useParams();

  const getRandomProducts = (products, count = 50) => {
    const shuffledProduct = [...products].sort(() => 0.5 - Math.random());
    return shuffledProduct.slice(0, count);
  };

  const searchByGender = products
    ? genderName === "All"
      ? getRandomProducts(products)
      : products.filter((person) => person.gender === genderName)
    : [];

  const [allClothFilter, setAllClothFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: 100, max: 5000 });
  // eslint-disable-next-line no-unused-vars
  const [clearFilter, setClearFilter] = useState({
    allClothFilter: "",
    ratingFilter: null,
    priceFilter: { min: 100, max: 5000 },
  });

  const changeHandler = (e) => {
    const { value, checked } = e.target;
    setAllClothFilter((prevCategories) =>
      checked
        ? [...prevCategories, value]
        : prevCategories.filter((category) => category !== value)
    );
  };

  const changeRatingFilter = (event) => {
    setRatingFilter(event.target.value);
  };

  const changeRangePriceFilter = (event) => {
    const { id, value } = event.target;
    setPriceFilter((prevRange) => ({
      ...prevRange,
      [id]: Number(value),
    }));
  };

  const clickClearHandler = () => {
    setClearFilter(
      setAllClothFilter([]),
      setRatingFilter(null),
      setPriceFilter({ min: 100, max: 5000 })
    );
  };

  const filteredClothes = searchByGender
    .filter((cloth) =>
      allClothFilter.length === 0 || allClothFilter.includes("All")
        ? true
        : allClothFilter.includes(cloth.category)
    )
    .filter((cloth) =>
      ratingFilter ? cloth.rating >= parseInt(ratingFilter) : true
    )
    .filter(
      (cloth) =>
        cloth.price >= priceFilter.min && cloth.price <= priceFilter.max
    )
    .filter(
      (cloth) =>
        cloth.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cloth.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cloth.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
  //console.log("filtered : ", filteredClothes);

  const [alertState, setAlertState] = useState("");

  const addToCartHandler = (product) => {
    dispatch(addToCart({ userId: user._id, product }));
    setAlertState("Product added to your Cart Successfully...");
    setTimeout(() => {
      setAlertState("");
    }, 1200);
    navigate("/cart");
  };

  const addToWhistlistHandler = (product) => {
    if (user?._id) {
      dispatch(addToWhislist({ userId: user._id, product }));
      setAlertState("Product added to your Wishlist Successfully...");
      setTimeout(() => {
        setAlertState("");
        //navigate("/whislist");
      }, 1200);
      // navigate("/whislist");
    } else {
      setAlertState(
        "You need to be logged in to add products to your wishlist."
      );
    }
  };

  // const removeFromWhislistHandler = (product) => {
  //   dispatch(removeFromWhislist(product));
  //   setAlertState("Product removed from your Wishlist Successfully...");
  //   setTimeout(() => {
  //     setAlertState("");
  //   }, 1000);
  // };

  // const [wishlistStates, setWishlistStates] = useState({});
  // const whislistBtnToggler = (id) => {
  //   setWishlistStates((prevStates) => ({
  //     ...prevStates,
  //     [id]: !prevStates[id],
  //   }));
  // };

  return (
    <>
      <Header />
      <div className="m-5">
        {alertState && (
          <div className="alert alert-success" role="alert">
            {alertState}
          </div>
        )}
        {status === "loading" && <p>loading...</p>}
        {error && "An error occured while fetching data"}
        <div className="row">
          <div className="col-md-2">
            <div className="">
              <label htmlFor="clearFilter" className="form-label">
                <b>Filters</b>
              </label>
              <Link
                onClick={clickClearHandler}
                className="pl-5 text-dark link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              >
                Clear All{" "}
              </Link>
            </div>

            <div className="form-check mt-5">
              <label htmlFor="categoryFilter" className="form-check-label">
                <b>Category</b>
              </label>
              <br />
              <input
                type="checkbox"
                id="allFilter"
                name="mensCloth"
                value="All"
                checked={allClothFilter.includes("All")}
                onChange={changeHandler}
              />{" "}
              All <br />
              <input
                type="checkbox"
                id="tshirtsFilter"
                name="mensCloth"
                value="T-shirts"
                checked={allClothFilter.includes("T-shirts")}
                onChange={changeHandler}
              />{" "}
              T-shirts <br />
              <input
                type="checkbox"
                id="shirtsFilter"
                name="mensCloth"
                value="Shirts"
                checked={allClothFilter.includes("Shirts")}
                onChange={changeHandler}
              />{" "}
              Shirts <br />
              <input
                type="checkbox"
                id="shortsFilter"
                name="mensCloth"
                value="Shorts"
                checked={allClothFilter.includes("Shorts")}
                onChange={changeHandler}
              />{" "}
              Shorts
              <br />
              <input
                type="checkbox"
                id="jeansFilter"
                name="mensCloth"
                value="Jeans"
                checked={allClothFilter.includes("Jeans")}
                onChange={changeHandler}
              />{" "}
              Jeans <br />
              <input
                type="checkbox"
                id="pantsFilter"
                name="mensCloth"
                value="Pants"
                checked={allClothFilter.includes("Pants")}
                onChange={changeHandler}
              />{" "}
              Pants
            </div>

            <div className="mt-5 form-check">
              <label htmlFor="ratingFilter" className="form-check-label">
                <b>Rating</b>
              </label>
              <br />
              <input
                type="radio"
                id="ratingFilter"
                value="4"
                name="rating"
                onChange={changeRatingFilter}
                checked={ratingFilter >= "4"}
              />{" "}
              4 stars and above <br />
              <input
                type="radio"
                id="ratingFilter"
                value="3"
                name="rating"
                onChange={changeRatingFilter}
                checked={ratingFilter >= "3" && ratingFilter < "4"}
              />{" "}
              3 stars and above <br />
              <input
                type="radio"
                id="ratingFilter"
                value="2"
                name="rating"
                onChange={changeRatingFilter}
                checked={ratingFilter >= "2" && ratingFilter < "3"}
              />{" "}
              2 stars and above <br />
              <input
                type="radio"
                id="ratingFilter"
                value="1"
                name="rating"
                onChange={changeRatingFilter}
                checked={ratingFilter >= "1" && ratingFilter < "2"}
              />{" "}
              1 stars and above <br />
            </div>

            <div className="mt-5 form-check">
              <label htmlFor="priceMin" className="form-label">
                <b>Min Price</b>
              </label>
              <input
                type="range"
                className="form-range"
                min="100"
                max="5000"
                id="min"
                value={priceFilter.min}
                onChange={changeRangePriceFilter}
              />
              <span>${priceFilter.min}</span>
            </div>

            <div className="mt-3 form-check">
              <label htmlFor="priceMax" className="form-label">
                <b>Max Price</b>
              </label>
              <input
                type="range"
                className="form-range"
                min="100"
                max="5000"
                id="max"
                value={priceFilter.max}
                onChange={changeRangePriceFilter}
              />
              <span>${priceFilter.max}</span>
            </div>
          </div>

          <div className="col-md-10">
            <div className="row">
              {filteredClothes.length > 0 ? (
                filteredClothes.map((cloth) => (
                  <div className="col-md-4 mb-4">
                    <div className="card" key={cloth.id}>
                      <div style={{ position: "relative", width: "100%" }}>
                        <Link to={`/product/${cloth._id}`}>
                          <img
                            src={cloth.imageUrl}
                            className="card-img-top"
                            alt="..."
                          />
                        </Link>

                        {/* <div
                          className="px-2 py-2 "
                          style={{
                            position: "absolute",
                            bottom: "10px",
                            right: "5px",
                            zIndex: 10,
                            // width: "2.5rem",
                            // height: "2.5rem",
                            borderRadius: "50%",
                            backgroundColor: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                          }}
                        >
                          <ion-icon
                            name={
                              wishlistStates[cloth._id]
                                ? "heart"
                                : "heart-outline"
                            }
                            style={{
                              width: "1.4rem",
                              height: "1.4rem",
                              color: wishlistStates[cloth._id] ? "red" : "gray",
                            }}
                            onClick={() => {
                              whislistBtnToggler(cloth._id);
                              addToWhistlistHandler(cloth);
                              // removeFromWhislistHandler(cloth);
                            }}
                          ></ion-icon>
                        </div> */}
                      </div>
                      <div className="card-body text-center">
                        <p
                          className="card-title "
                          style={{
                            color: "#866528",
                            fontSize: "15px",
                          }}
                        >
                          {cloth.brand}
                        </p>
                        <h5
                          className="card-title "
                          style={{
                            fontSize: "18px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "clip",
                          }}
                        >
                          {cloth.name}
                        </h5>
                        <div className="card-text">
                          <p>
                            <b>{cloth.price}</b>
                          </p>

                          <div
                            className="d-flex justify-content-evenly"
                            style={{ flexWrap: "wrap" }}
                          >
                            <button
                              type="button"
                              className="btn btn btn-outline-primary"
                              style={{
                                flex: "0 0 auto",
                                marginBottom: "10px",
                              }}
                              onClick={() => addToCartHandler(cloth)}
                            >
                              Add to Cart
                            </button>
                            <button
                              type="button"
                              className="btn btn btn-outline-danger"
                              style={{
                                flex: "0 0 auto",
                                marginBottom: "10px",
                              }}
                              onClick={() => addToWhistlistHandler(cloth)}
                              // onClick={() => whislistBtnToggler(cloth)}
                            >
                              Add to Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p> Loading Items...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
