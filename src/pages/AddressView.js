import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteAddress, fetchAddresses } from "../features/addressSlice";
import { useNavigate } from "react-router-dom";

const AddressView = ({ onSelectAddress }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const addresses = useSelector((state) => state.address.addressArr);
  const status = useSelector((state) => state.address.status);
  const error = useSelector((state) => state.address.error);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // useEffect(() => {
  //   dispatch(fetchAddresses(user._id));
  // }, [dispatch, user, navigate]);

  useEffect(() => {
    if (isAuthenticated && user._id) {
      dispatch(fetchAddresses(user._id));
    }
  }, [dispatch, isAuthenticated, user._id]);

  const clickDeleteHandler = (e, id) => {
    e.stopPropagation();
    dispatch(deleteAddress(id));
  };

  const editClickHandler = (address) => {
    navigate("/addressform", { state: { address } });
  };

  const selectAddressClickHandler = (id) => {
    setSelectedAddressId(id === selectedAddressId ? null : id);
    const selectedAddress = addresses.find((address) => address._id === id);
    onSelectAddress(selectedAddress);
  };
  return (
    <>
      <div className="">
        {status === "loading" && <p>Loading addresses...</p>}
        {error && (
          <p>An error occurred while fetching the addresses :- {error}</p>
        )}
        <div className="row mb-4 ">
          <div
            className="fs-6 fw-semibold rounded-top bg-success-subtle "
            style={{
              width: "100%",
              padding: "10px 15px",
              border: "1px solid lightgray",
              // borderBlockEnd: "0",
            }}
          >
            Choose your location
          </div>
          <div className="card rounded-0 rounded-bottom bg-light">
            <div className="card-body">
              <p class="card-subtitle mb-3 ">
                Select a delivery location to see product availability and
                delivery options
              </p>
              {/* {Array.isArray(addresses) && addresses.length > 0 ? ( */}
              {addresses && addresses.length > 0 ? (
                addresses.map((address) => (
                  <div className="" key={address._id}>
                    <div
                      className={`card mb-4 ${
                        selectedAddressId === address._id
                          ? "bg-info-subtle"
                          : " "
                      }`}
                      onClick={() => selectAddressClickHandler(address._id)}
                    >
                      <div class="card-body">
                        <p class="card-text">
                          {address.fullAddress}, {address.locality},{" "}
                          {address.city}, {address.pinCode}, {address.state}{" "}
                          {address.country}
                        </p>

                        <div
                          className="d-flex justify-content-between"
                          style={{ flexWrap: "wrap" }}
                        >
                          <button
                            className="btn btn-warning btn-sm rounded me-3 "
                            onClick={() => editClickHandler(address)}
                            style={{ flex: "1 0 auto", marginBottom: "10px" }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger btn-sm rounded "
                            onClick={(e) => clickDeleteHandler(e, address._id)}
                            style={{ flex: "1 0 auto", marginBottom: "10px" }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No addresses found.</p>
              )}
              <Link to="/addressform">
                <button className="my-2  btn btn-success w-100">
                  Add New Address
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddressView;
