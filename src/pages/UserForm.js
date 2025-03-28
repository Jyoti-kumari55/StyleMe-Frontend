import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { createUser, fetchUser, updateUser } from "../features/userSlice";

const UserForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state?.user || {};
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  const [name, setName] = useState(user.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setPhoneNumber(user.phoneNumber);
      setEmail(user.email);
      setPassword(user.password);
    }
  }, [user]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (value.length <= 10) {
      setPhoneNumber(value);
    }
    if (value.length === 10) {
      setPhoneError("");
    } else if (value.length < 10) {
      setPhoneError("Phone number should be exactly 10 digits");
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      setPhoneError("Please enter your correct Phone number!!.");
      return;
    }

    const userData = {
      name,
      phoneNumber,
      email,
      password,
    };
    if (user._id) {
      dispatch(updateUser({ userId: user._id, updateUserData: userData }))
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Failed to update user...", error);
        });
    } else {
      dispatch(createUser(userData))
        .unwrap()
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Failed to add user...", error);
        });
    }
    setName("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <Link to={"/login"} className="mb-3 btn btn-primary px-4">
          {" "}
          Back
        </Link>
        {status === "loading" && <p>Loading user data...</p>}
        {error && <p>An error occured while fetching the user - {error}</p>}
        <h2> {user._id ? "Edit your details" : "Create your account"} </h2>

        <form
          id="userForm"
          className="my-4 shadow-lg p-4 rounded "
          style={{ width: "60%" }}
          onSubmit={formSubmitHandler}
        >
          <label htmlFor="username" className="form-label">
            Full Name:
          </label>
          <input
            type="text"
            id="username"
            value={name}
            className="form-control mb-4 shadow bg-body-tertiary"
            placeholder="Enter your Full Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="userContactNum" className="form-label">
            Mobile Number:{" "}
          </label>
          <input
            type="number"
            className=" form-control mb-4 shadow bg-body-tertiary"
            id="userContactNum"
            placeholder="Enter your Mobile Number"
            value={phoneNumber}
            onChange={handlePhoneChange}
            maxLength="10"
            required
            // onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {phoneError && <p className="text-danger">{phoneError}</p>}

          <label htmlFor="userEmail" className="form-label">
            Email:{" "}
          </label>
          <input
            type="email"
            className=" form-control mb-4 shadow bg-body-tertiary"
            id="userEmail"
            placeholder="Enter your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="userPassword" className="form-label">
            Password:{" "}
          </label>
          <input
            type="password"
            className="form-control mb-4 shadow bg-body-tertiary"
            id="userPassword"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-center ">
            <button
              className="btn btn-success w-50 w-sm-25 shadow rounded"
              id="userBtn"
            >
              {user._id ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default UserForm;
