import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { addAddresses, updateAddresses } from "../features/addressSlice";
import { useSelector } from "react-redux";

const AddressForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const address = location.state?.address || {};

  const { user } = useSelector((state) => state.user);

  const [pinCode, setPincode] = useState(address.pinCode || "");
  const [fullAddress, setFullAddress] = useState(address.fullAddress || "");
  const [locality, setLocality] = useState(address.locality || "");
  const [city, setCity] = useState(address.city || "");
  const [state, setState] = useState(address.state || "");
  const [country, setCountry] = useState(address.country || "");
  const [error, setError] = useState("");
  // const [formState, setFormState] = useState({
  //   pinCode: addresses.pinCode || "",
  //   fullAddress: addresses.fullAddress || "",
  //   locality: addresses.locality || "",
  //   city: addresses.city || "",
  //   state: addresses.state || "",
  //   country: addresses.country || "",
  // });

  useEffect(() => {
    if (address._id) {
      setPincode(address.pinCode);
      setFullAddress(address.fullAddress);
      setLocality(address.locality);
      setCity(address.city);
      setState(address.state);
      setCountry(address.country);
    }
  }, [address]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!pinCode || !fullAddress || !locality || !city || !state || !country) {
      alert("All fields are required!");
      return;
    }

    if (pinCode.length !== 6) {
      setError("Pin code should be 6 digits.");
      return;
    }
    const addressDetails = {
      pinCode,
      fullAddress,
      locality,
      city,
      state,
      country,
    };
    if (address._id) {
      dispatch(
        updateAddresses({ id: address._id, updatedAddress: addressDetails })
      )
        .unwrap()
        .then(() => {
          navigate("/cart", { replace: true });
        })
        .catch((error) => {
          console.error("Failed to update Address...", error);
        });
    } else {
      dispatch(addAddresses({ userId: user._id, userDetails: addressDetails }))
        .unwrap()
        .then(() => {
          navigate("/cart", { replace: true });
        })
        .catch((error) => {
          console.error("Failed to add Address...", error);
        });
    }
    setPincode("");
    setFullAddress("");
    setLocality("");
    setCity("");
    setState("");
    setCountry("");
    setError("");
  };

  return (
    <>
      <Header />
      <div className="container mt-4 ">
        <Link to={"/cart"} className="mb-3 btn btn-primary px-4">
          {" "}
          Back
        </Link>
        <h2> {address._id ? "Edit Address" : "Add Address"}</h2>
        <div className="card shadow-lg p-4 w-75">
          <form onSubmit={formSubmitHandler}>
            <label htmlFor="pinCode" className="form-label">
              Pincode{" "}
            </label>
            <input
              id="pinCode"
              type="number"
              placeholder="Pin code"
              className="mb-4 form-control shadow bg-body-tertiary "
              value={pinCode}
              // onChange={(e) => setPincode(e.target.value)}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 6) {
                  setPincode(value);
                }
              }}
              maxLength={6}
              // disabled={pinCode.length === 6}
            />
            {error && <div className="text-danger mb-3">{error}</div>}

            <label htmlFor="address" className="form-label">
              Flat no / Building Name{" "}
            </label>
            <input
              type="text"
              placeholder="Flat no / Building Name"
              className="mb-4 form-control shadow bg-body-tertiary"
              value={fullAddress}
              onChange={(e) => setFullAddress(e.target.value)}
            />

            <label htmlFor="locality" className="form-label">
              Locality / Area / Street{" "}
            </label>
            <input
              type="text"
              placeholder="Locality / Area / Street"
              className="mb-4 form-control shadow bg-body-tertiary"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />

            <label htmlFor="city" className="form-label">
              City{" "}
            </label>
            <input
              type="text"
              placeholder="City"
              className="mb-4 form-control shadow bg-body-tertiary"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <label htmlFor="state" className="form-label">
              State{" "}
            </label>
            <input
              type="text"
              placeholder="State"
              className="mb-4 form-control shadow bg-body-tertiary"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />

            <label htmlFor="country" className="form-label">
              Country{" "}
            </label>
            <input
              type="text"
              placeholder="Country"
              className="mb-4 form-control shadow bg-body-tertiary"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />

            <button type="submit" className="btn btn-success text-light px-4">
              {address._id ? "Save" : "Add"}
            </button>
          </form>
        </div>
      </div>
      {/* <div className="container mt-4">
        <h2>{addresses._id ? "Edit Address" : "Add Address"}</h2>
        <form onSubmit={formSubmitHandler}>
          {Object.entries(formState).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="form-label">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </label>
              <input
                id={key}
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                className="form-control"
                value={value}
                onChange={inputChangeHandler}
              />
            </div>
          ))}
          <button type="submit" className="btn btn-dark text-light">
            {addresses._id ? "Edit" : "Add"}
          </button>
        </form>
      </div> */}
    </>
  );
};

export default AddressForm;
