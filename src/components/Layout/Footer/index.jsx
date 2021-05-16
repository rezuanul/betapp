export default function index() {
  return (
    <div className="mt-7 py-5 bg-primary footer">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <h4>About GambleBoard</h4>

            <p>
              GambleBoard is a decentralized application running on the Ethereum blockchain. It makes it possible for users to bet against each other on almost any event!
            </p>
          </div>

          <div className="col-md-4">
            <h4>Powered By</h4>

            <img
              className="img-fluid"
              src="https://block-builders.nl/wp-content/uploads/2021/01/Graph-Protocol-678x381.png"
              alt="Powered By"
            />
          </div>
          <div className="col-md-3">
            <img
              className="img-fluid"
              src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Kleros-logo.png"
              alt="Powered By"
            />
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
