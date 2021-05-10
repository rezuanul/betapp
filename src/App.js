import React, { useCallback, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/styles/index.scss';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import Homepage from './pages/Homepage';
import Event from './pages/Event';
import CreateBet from './pages/CreateBet';
import PlaceBet from './pages/PlaceBet';
import GambleBoard from './abis/GambleBoard.json'

const contractAdress = "0x6aa92B1D78e7bEfBEE724dE3AA35CD34BB52c606";

function App() {

  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/event" component={Event} />
        <Route exact path="/create-bet" component={CreateBet} />
      </Switch>
      <Footer />
    </div>
  );

}

export default App;
