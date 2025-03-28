import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUser, loginUsers } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [selectedUser, setSelectedUser] = useState({});
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) dispatch(fetchUser());
  }, [dispatch, isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!selectedUser.email || !selectedUser.password) {
      setLoginMessage("Please enter both email and password");
      return;
    }

    dispatch(loginUsers(selectedUser))
      .then((response) => {
        setSelectedUser(response.payload.user);
        setLoginMessage(`Welcome, ${response.payload.user.name}!`);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        setLoginMessage("Invalid email or password");
        setTimeout(() => {
          setLoginMessage("");
        }, 1000);
      });
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   if (!selectedUser.email || !selectedUser.password) {
  //     toast.error("Please enter both email and password");
  //     setLoginMessage("");
  //     return;
  //   }

  //   dispatch(loginUsers(selectedUser))
  //     .then(() => {
  //       toast.success(`Welcome, ${selectedUser.name}!`);
  //       setLoginMessage("");

  //       setTimeout(() => {
  //         navigate("/");
  //       }, 1500);
  //     })
  //     .catch((error) => {
  //       toast.success(error);
  //       setLoginMessage("");
  //     });
  // };

  return (
    <>
      <Header />
      <div className="bg-light">
        <div
          className="container pt-5"
          style={{ alignContent: "center", width: "50%" }}
        >
          <div className="card shadow-lg p-3 mb-5 bg-body-tertiary rounded position-relative">
            <div className="row">
              <div className="col-md-5 col-12">
                <img
                  src="https://images.pexels.com/photos/5632346/pexels-photo-5632346.jpeg?auto=compress&cs=tinysrgb&w=400"
                  className="img-fluid rounded object-fit-cover"
                  style={{ height: "100%" }}
                  alt="loginImg"
                />
              </div>

              <div className="col-md-7 col-12">
                <div className="card-body">
                  {loginMessage && (
                    <h2 className="text-center mt-5 fw-semibold">
                      {loginMessage}
                    </h2>
                  )}
                  <form id="userForm" onSubmit={handleLogin} className="my-4">
                    <label htmlFor="userEmail" className="form-label">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="form-control mb-4 shadow"
                      id="userEmail"
                      placeholder="Enter your email"
                      value={selectedUser?.email || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          email: e.target.value,
                        })
                      }
                    />

                    <label htmlFor="userPassword" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control mb-4 shadow"
                      id="userPassword"
                      placeholder="Enter your password"
                      value={selectedUser?.password || ""}
                      onChange={(e) =>
                        setSelectedUser({
                          ...selectedUser,
                          password: e.target.value,
                        })
                      }
                    />

                    <div className="text-center">
                      <button
                        className="btn btn-primary w-50 w-sm-25 shadow rounded"
                        type="submit"
                        id="userBtn"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>

                  <div className="d-flex justify-content-evenly align-items-center gap-3">
                    <Link to="/userForm" className="btn btn-primary">
                      Create Account
                    </Link>

                    {/* <button
                      className="btn btn-warning"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasWithBothOptions"
                      aria-controls="offcanvasWithBothOptions"
                    >
                      Registered Users
                    </button>

                    <div
                      className="offcanvas offcanvas-start"
                      data-bs-scroll="true"
                      tabIndex="-1"
                      id="offcanvasWithBothOptions"
                      aria-labelledby="offcanvasWithBothOptionsLabel"
                    >
                      <div className="offcanvas-header">
                        <h5
                          className="offcanvas-title"
                          id="offcanvasWithBothOptionsLabel"
                        >
                          Let's Login To StyleMe
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>
                      <UserView onSelectUser={setSelectedUser} />
                    </div> */}
                  </div>

                  {/* {status === "loading" && <p>Logging in...</p>} */}
                  {/* {<p className="text-danger">{error}</p>} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
