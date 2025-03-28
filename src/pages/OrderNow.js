import { Link } from "react-router-dom";
import Header from "../components/Header";

const OrderNow = () => {
  return (
    <>
      <Header />
      <div
        className="container mt-5 d-flex justify-content-center align-items-center"
        style={{ height: "30rem" }}
      >
        <div className="card" style={{ width: "20rem" }}>
          <div className="card-body">
            <h5 className="card-title">
              Thank you for Shopping 😊 Come Again !!
            </h5>
            <Link to="/" className="btn btn-primary mt-3">
              {" "}
              Continue Shopping{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderNow;
