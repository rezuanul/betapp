export default function index() {
  return (
    <div className="mt-5 py-5 bg-primary footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h4>About BetApp</h4>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
            </p>
          </div>

          <div className="col-md-4">
            <h4>Powered By</h4>

            <img
              className="img-fluid"
              src="http://via.placeholder.com/600x100?text=Powered+By+Image"
              alt="Powered By"
            />
          </div>
          <div className="col-md-3">
            <h4>Know More</h4>
            <ul className="pl-3">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <p className="text-center">© 2021 BetApp</p>
          </div>
        </div>
      </div>
    </div>
  );
}
