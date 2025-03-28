import { Link } from "react-router-dom";
import Header from "../components/Header";

const Mens = () => {
  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container pt-5">
          <h1>MENS</h1>
          <div className="row">
            <div className="col-md-3 my-3">
              <Link to="/cloth/GAP">
                <img
                  src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-gap-min30.jpg"
                  className="img-fluid"
                  alt="mens-cloth"
                />
              </Link>
            </div>

            <div className="col-md-3 my-3">
              <Link to="/cloth/SNITCH">
                <img
                  src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-snitch-min40.jpg"
                  className="img-fluid"
                  alt="mens-cloth"
                />
              </Link>
            </div>

            <div className="col-md-3 my-3">
              <Link to="cloth/MAX">
                <img
                  src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-allensolly-upto40.jpg"
                  className="img-fluid"
                  alt="mens-cloth"
                />
              </Link>
            </div>
            <div className="col-md-3 my-3">
              <Link to="cloth/LOUIS PHILIPPE">
                <img
                  src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-louisphilippe-upto40.jpg"
                  className="img-fluid"
                  alt="mens-cloth"
                />
              </Link>
            </div>
            <div className="col-md-3 my-3">
              <Link to="cloth/NIKE">
                <img
                  src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-nike-upto50.jpg"
                  className="img-fluid"
                  alt="mens-cloth"
                />
              </Link>
            </div>

            <div className="col-md-3 my-3">
              <Link to="cloth/ARROW">
                <img
                  src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-arrow-upto40.jpg"
                  className="img-fluid"
                  alt="mens-cloth"
                />
              </Link>
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-gap-min30.jpg"
                className="img-fluid"
                alt="mens-cloth"
              />
            </div>

            <div className="col-md-3 my-3">
              <img
                src="https://assets.ajio.com/cms/AJIO/WEB/D-1.0-23082024-z6-BestOfBrands-snitch-min40.jpg"
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
export default Mens;
