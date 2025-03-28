import Footer from "./components/Footer";
import Header from "./components/Header";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <>
        <Header />
        <div className="bg-light">
          <div className="container pt-5">
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel slide"
              data-bs-ride="corousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    className="d-block w-100 img-fluid"

                    alt="img1"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.pexels.com/photos/1201613/pexels-photo-1201613.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    className="d-block w-100 img-fluid"

                    alt="img2"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.pexels.com/photos/10188726/pexels-photo-10188726.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    className="d-block w-100 img-fluid"

                    alt="img3"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.pexels.com/photos/840916/pexels-photo-840916.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    className="d-block w-100 img-fluid"

                    alt="img4"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.pexels.com/photos/952212/pexels-photo-952212.jpeg?auto=compress&cs=tinysrgb&w=1400"
                    className="d-block w-100 img-fluid"

                    alt="img5"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="https://images.pexels.com/photos/845434/pexels-photo-845434.jpeg?auto=compress&cs=tinysrgb&w=1440"
                    className="d-block w-100 img-fluid"
                    alt="img6"
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </>
    </div>
  );
}

export default App;
