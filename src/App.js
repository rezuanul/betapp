import { Switch, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/styles/index.scss';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import Homepage from './pages/Homepage';
import FootballMatch from './pages/FootballMatch';
import CreateBet from './pages/CreateBet';
import PlaceBet from './pages/PlaceBet';

function App() {
  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/match/football" component={FootballMatch} />
        <Route exact path="/match/football/create-bet" component={CreateBet} />
        <Route exact path="/match/football/place-bet" component={PlaceBet} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
