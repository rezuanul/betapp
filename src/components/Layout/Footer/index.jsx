export default function index() {
  return (
    <div className="mt-5 py-4 bg-primary footer">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h4>About Gambleboard</h4>

            <p>
              GambleBoard is a decentralized application running on the Ethereum blockchain. It makes it possible for users to bet against each other on almost any event!
            </p>
          </div>

          <div className="col-md-4">
            <div className="container">
              <h5>Powered By</h5>
              <div className="row">

                <div className="col">
                  <a href="https://thegraph.com/"  target="_blank">
                    <img
                      className="img-fluid"
                      src="https://block-builders.nl/wp-content/uploads/2021/01/Graph-Protocol-678x381.png"
                      alt="Powered By"
                    />
                  </a>
                </div>

                <div className="col">
                  <a href="https://kleros.io/" target="_blank">
                    <img
                      className="img-fluid"
                      src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Kleros-logo.png"
                      alt="Powered By"
                    />
                  </a>
                </div>

              </div>
            </div>
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
