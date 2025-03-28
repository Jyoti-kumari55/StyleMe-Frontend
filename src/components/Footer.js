const Footer = () => (
  <>
    <div className="bg-light my-4">
      <footer className="container " style={{ marginTop: "6rem" }}>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div class="card">
              <img
                src="https://images.unsplash.com/photo-1627511306341-f9d96646b91d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VtbWVyJTIwY2xvdGhpbmd8ZW58MHx8MHx8fDA%3D"
                class="card-img-top img-fluid "
                style={{ height: "400px", width: "100%" }}
                alt="clothImg"
              />
              <div className="card-body">
                <p className="card-title mt-4 fw-semibold">NEW ARRIVALS</p>
                <h4 className="card-title">Summer Collection</h4>
                <p className="card-text">
                  Check out our best summer collections to feel less warm or
                  wear in styles as you want.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div class="card">
              <img
                src="https://images.pexels.com/photos/14642653/pexels-photo-14642653.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
                style={{ height: "400px", width: "100%" }}
                className="card-img-top img-fluid"
                alt="clothImg"
              />
              <div className="card-body h-100 d-flex flex-column">
                <p className="card-title mt-4 fw-semibold">NEW ARRIVALS</p>
                <h4 className="card-title">Winter Collection</h4>
                <p className="card-text">
                  Check out our best winter collections to feel warm, comfort or
                  wear in styles as you want.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </>
);

export default Footer;
