import { NavLink } from "react-bootstrap";
import { Link } from "react-bootstrap-icons";
import Header from "../components/Header";

const Women = () => {
  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container pt-5">
          <h1>WOMENS</h1>
          <div className="row">
            <div className="col-md-3 my-3">
              <Link to="/cloth/MAX" className="nav-link">
                <img
                  src="https://assets.ajio.com/cms/AJIO/WEB/D-21072024-TrendsSIS-BagTheClosetBasics-tops-starting199.jpg"
                  className="img-fluid"
                  alt="mens-cloth"
                />
              </Link>
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/d-1.0-WHP-230824-bestofbrands-9-teamspirit.jpg.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/d-1.0-WHP-230824-bestofbrands-1-gap.jpg.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/d-1.0-WHP-230824-bestofbrands-2-uspa.jpg.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/d-1.0-WHP-230824-bestofbrands-3-levis.jpg.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/d-1.0-WHP-230824-bestofbrands-7-avvasa.jpg.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/d-1.0-WHP-230824-bestofbrands-8-dnmx.jpg.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/d-1.0-WHP-230824-bestofbrands-11-gulmohar.jpg.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Women;
