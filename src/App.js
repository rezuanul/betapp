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
import Arbitrator from './abis/Arbitrator.json'
import Web3 from 'web3'
import Archon from '@kleros/archon'
import { create } from 'ipfs-http-client'
import { useQuery } from '@apollo/client';

import { STATE_OPEN } from './const/contractEnums';

import { EVENTS_QUERY } from './const/queries'
import resolveFilterVariablesForQuery from './interaction/filterBooleanResolver';


const BET_CONTRACT_ADDRESS = "0x2E6318CC9006f132265fDBf9F68569172101Bb6f";
const ARBITRATOR_CONTRACT_ADDRESS = "0xB767De12E3c01F31a437Edc69016D4d6E09bcc68"

function App() {

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  //Initialize used clients
  const web3 = new Web3(window.ethereum);

  // For interacting with the contract
  const betContract = new web3.eth.Contract(
    GambleBoard,
    BET_CONTRACT_ADDRESS
  );

  // For arbitration fee
  const arbitratorContract = new web3.eth.Contract(
    Arbitrator,
    ARBITRATOR_CONTRACT_ADDRESS
  )

  // Utilities for submitting evidence
  const archon = new Archon('http://127.0.0.1:8545');
  archon.setIpfsGateway('http://127.0.0.1:8080');

  // Client for sending evidence to ipfs.
  const ipfsClient = create('http://localhost:5001/api/v0');

  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////
  // Connect Metamask automatically
  // Account hook
  const [account, setAccount] = useState(0);

  // Hooks for listing filters
  const [filters, setFilters] = useState({
    country: '',
    category: '',
    league: '', // The undefined value, We can't give the parameter as undefined to the query, and we want to also query the empty string.
    eventID: null, // For showing the bets under one event. Overridden if any other filter is selected.
    state: STATE_OPEN,
    account: ''
  })

  // Queries
  /////////////////////////////////////////////////

  const { loading, error, data, refetch } = useQuery(EVENTS_QUERY, {
    variables: resolveFilterVariablesForQuery(filters)
  });

  /// called on every render. "Listens" to account changes.
  useEffect(() => {
    getAccount();
    return () => window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
  }, [account, handleAccountsChanged]);

  async function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      alert("Sign in to Metamask to use the app!")
    } else if (accounts[0] !== account) {
      setAccount(accounts[0])
      if (filters.account !== '') {
        setFilters(filters => {
          filters.account = accounts[0];
          return filters;
        });
      }
    }
  }

  //// Get account from user or use the existing one.
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
    window.ethereum.on("accountsChanged", handleAccountsChanged);
  }, [account]);
  ///////////////////////////////////////////////////
  ///////////////////////////////////////////////////

  // Pass down objects you need. e.g. contract object.
  return (
    <div className="d-flex flex-column" style={{ height: '100vh' }}>
      <Navbar />
      <Switch>
        <Route exact path="/" render={props => <Homepage
          account={account}
          filters={filters}
          setFilters={setFilters}
          loading={loading}
          error={error}
          data={data}
          refetch={refetch}
        />} />
        <Route exact path="/event" render={props => <Event
          betContract={betContract}
          arbitratorContract={arbitratorContract}
          account={account}
          filters={filters}
          setFilters={setFilters}
          archon={archon}
          ipfsClient={ipfsClient}
        />} />
        <Route exact path="/create-bet" render={props => <CreateBet
          web3={web3}
          betContract={betContract}
          account={account}
          filters={filters}
          setFilters={setFilters}
          archon={archon}
          ipfsClient={ipfsClient}
        />} />
      </Switch>
      <Footer />
    </div>
  );

}

export default App;
