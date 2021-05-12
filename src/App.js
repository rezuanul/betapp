import React, { useCallback, useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/styles/index.scss';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import Homepage from './pages/Homepage';
import Event from './pages/Event';
import CreateBet from './pages/CreateBet';
import GambleBoard from './abis/GambleBoard.json'
import Web3 from 'web3'

const CONTRACT_ADDRESS = "0x2E6318CC9006f132265fDBf9F68569172101Bb6f";

function App() {

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  //Initialize used clients
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(
    GambleBoard,
    CONTRACT_ADDRESS
  );

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  // Connect Metamask automatically
  const [account, setAccount] = useState(0);

  useEffect(() => {
    getAccount();
  }, [account]);

  const getAccount = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        if (error.code === 4001) {
          // User rejected request
          alert("Connect account to use the application!")
        } else {
          alert("Error connecting Metamask")
        }
      }
    } else {
      alert("Please install metamask!")
    }
    window.ethereum.on("accountsChanged", function (accounts) {
      setAccount(accounts[0]);
      console.log(accounts[0])
    });
  }, [account]);

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

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
