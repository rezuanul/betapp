import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import BetTable from '../../components/BetTable';
import PageCover from '../../components/Layout/PageCover';
import Modal from '../../components/Modal';
import { useHistory } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { countryOptionsArray, categoryOptionsArray } from '../../const/filterMappings';
import { GET_BETS } from '../../const/queries';
import resolveFilterVariablesForQuery from '../../interaction/filterBooleanResolver';
import { StateToText, STATE_OPEN } from '../../const/contractEnums'
import EvidenceModal from '../../components/EvidenceModal';
import genEvidence from '../../interaction/genEvidence';


export default function Event({ betContract, arbitratorContract, account, filters, setFilters, archon, ipfsClient }) {

  const { loading, error, data, refetch } = useQuery(GET_BETS,
    {
      variables: resolveFilterVariablesForQuery(filters)
    });

  // Transaction MODAL
  ////////////////////////////////
  const history = useHistory();
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transacting, setTransacting] = useState(false);
  const [transactionError, setTransactionError] = useState(false);

  // Evidence MODAL
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [evidenceSuccess, setEvidenceSuccess] = useState(false);
  const [evidenceTransacting, setEvidenceTransacting] = useState(false);
  const [evidenceError, setEvidenceError] = useState(false);
  const [evidenceBetID, setEvidenceBetID] = useState(-1);
  const [evidenceInput, setEvidenceInput] = useState("");
  const [evidenceErrorText, setEvidenceErrorText] = useState("");

  const handleCloseTransactionModal = () => {
    setShowTransactionModal(false);
    setTransacting(false);
    setTransactionSuccess(false);
    setTransactionError(false);
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const handleOpenTransactionModal = () => {
    setShowTransactionModal(true);
    setTransacting(true);
    setTransactionSuccess(false);
    setTransactionError(false);
  };


  const handleRedirect = () => {
    setShowTransactionModal(false);
    setTransacting(false);
    setTransactionSuccess(false);
    setTransactionError(false);
    setShowEvidenceModal(false);
    setEvidenceTransacting(false);
    setEvidenceSuccess(false);
    setEvidenceError(false);
    setEvidenceBetID(-1);
    setEvidenceInput('');
    setFilters(filters => {
      filters.eventID = null;
      return filters;
    });
    history.push('/');
  };


  const handleTransactionError = () => {
    setTransacting(false);
    setTransactionError(true);
  }

  const handleTransactionSuccessful = () => {
    setTransacting(false);
    setTransactionSuccess(true);
  }

  const handleCloseEvidenceModal = () => {
    setShowEvidenceModal(false);
    setEvidenceTransacting(false);
    setEvidenceSuccess(false);
    setEvidenceError(false);
    setEvidenceBetID(-1);
    setEvidenceErrorText('');
    setEvidenceInput('');
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const handleOpenEvidenceModal = (betID) => {
    setEvidenceBetID(evidenceBetID => {
      evidenceBetID = betID;
      return evidenceBetID;
    });
    setFilters(filters => {
      filters.eventID = null;
      return filters;
    });
    setShowEvidenceModal(true);
    setEvidenceTransacting(false);
    setEvidenceSuccess(false);
    setEvidenceError(false);
    setEvidenceInput('');
  };

  const handleEvidenceError = (errorText) => {
    setEvidenceErrorText(errorText);
    setEvidenceTransacting(false);
    setEvidenceError(true);
  }

  const handleEvidenceSuccessful = () => {
    setEvidenceTransacting(false);
    setEvidenceSuccess(true);
  }


  // Filter handlers
  /////////////////////////////////////

  const countryFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.country = e.target.value;
      filters.eventID = null;
      return filters;
    });
    e.target.value = filters.country;
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const leagueFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.league = e.target.value;
      filters.eventID = null;
      return filters;
    });
    e.target.value = filters.league;
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const categoryFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.category = e.target.value;
      filters.eventID = null;
      return filters;
    });
    e.target.value = filters.category;
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const stateFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.state = parseInt(e.target.value);
      filters.eventID = null;
      return filters;
    });
    e.target.value = filters.state;
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const resetFilters = async () => {
    await setFilters(filters => {
      filters.league = '';
      filters.category = '';
      filters.country = '';
      filters.state = STATE_OPEN;
      filters.eventID = null;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const yourBetsHandler = async (e) => {
    let acc = '';
    let buttonText = 'Show your bets';
    if (filters.account !== account) {
      acc = account;
      buttonText = 'Show all bets'
    }
    await setFilters(filters => {
      filters.account = acc;
      return filters;
    });
    e.target.innerText = buttonText;
    refetch(resolveFilterVariablesForQuery(filters));
  }

  // Contract call handlers 
  /////////////////////////////////////////////
  const backBetHandler = async (betID, stake) => {
    handleOpenTransactionModal();
    betContract.methods
      .placeBet(betID)
      .send({ from: account, value: stake })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());

  }

  const voteHandler = async (betID, outcome) => {
    handleOpenTransactionModal();
    betContract.methods
      .voteOnOutcome(betID, outcome)
      .send({ from: account })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }
  const disputeBetHandler = async (betID) => {
    handleOpenTransactionModal();
    let arbitrationCost = await arbitratorContract.methods.arbitrationCost("0x00").call();
    betContract.methods
      .createDispute(betID)
      .send({ from: account, value: arbitrationCost })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }
  const refundBetHandler = async (betID) => {
    handleOpenTransactionModal();
    betContract.methods
      .refund(betID)
      .send({ from: account })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }
  const claimWinningsHandler = async (betID) => {
    handleOpenTransactionModal();
    betContract.methods
      .claimWinnings(betID)
      .send({ from: account })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }

  const handleSubmitEvidence = async () => {
    //let textBlob = new Blob([evidenceInput], { type: "text/plain;charset=utf-8" });
    setEvidenceTransacting(true);
    setEvidenceSuccess(false);
    setEvidenceError(false);
    setEvidenceErrorText('');

    let evidenceFileHash = archon.utils.multihashFile(
      evidenceInput,
      0x1B // keccak-256
    );

    let ipfsResultObject;
    try {
      ipfsResultObject = await ipfsClient.add(evidenceInput);
    } catch (e) {
      console.log(e);
      handleEvidenceError("Adding evidence to IPFS failed. Check the console log!");
    }
    let evidenceFileURI = 'http://localhost:8080/ipfs/' + ipfsResultObject.path;
    console.log("Evidence file keccak-256 hash: " + evidenceFileHash);
    console.log("Evidence file IPFS address: " + evidenceFileURI);
    
    let evidenceIsValid;
    await archon.utils.validateFileFromURI(
      evidenceFileURI,
      { hash: evidenceFileHash }
    ).then(data => {
      evidenceIsValid = data.isValid
      console.log((data.isValid) ? "Evidence data in IPFS validated succesfully against it's hash!" : "Evidence data in IPFS could not be validated!"); // true
    })

    if (evidenceIsValid) {
      let evidenceJSONObject = genEvidence(
        evidenceFileURI,
        evidenceFileHash,
        "txt",
        "Evidence from: " + account,
        "Freeform text evidence on the dispute");

      let ipfsResultObjectEvidenceJson;
      try {
        ipfsResultObjectEvidenceJson = await ipfsClient.add(JSON.stringify(evidenceJSONObject));
      } catch (e) {
        console.log(e);
        handleEvidenceError("Adding evidence to IPFS failed. Check the console log!");
      }
      let evidenceJSONURI = 'http://localhost:8080/ipfs/' + ipfsResultObjectEvidenceJson.path;
      console.log("Evidence JSON IPFS address: " + evidenceJSONURI);

      betContract.methods
        .provideEvidence(evidenceBetID, '/ipfs/' + ipfsResultObjectEvidenceJson.path)
        .send({ from: account })
        .then((res) => handleEvidenceSuccessful(), (res) => handleEvidenceError("Contract transaction failed!"))
    } else {
      handleEvidenceError("Evidence data in IPFS could not be validated againt its hash!");
    }
  }

  // Reload data from graph
  const reloadHandler = async () => {
    refetch(resolveFilterVariablesForQuery(filters));
  }

  return (
    <div>
      <PageCover description={"Search and Back bets"} />
      <div className="col">
        <div className="mt-5 row">

          <div className="col-sm-2 ">
            <div className="container">

              <div className="btn btn-block mt-3">
                <Button href="/create-bet" variant="info" block>
                  Create a Bet
                  </Button>
              </div>

              <div className="btn btn-block mt-3">
                <Button variant="warning" onClick={resetFilters} block>
                  Reset filters
                  </Button>
              </div>

              <div className="btn btn-block mt-3">
                <Button variant="outline-success" onClick={yourBetsHandler} block>
                  Show your bets
                  </Button>
              </div>

              <div className="btn btn-block mt-3">
                <Button variant="outline-primary" onClick={reloadHandler} block>
                  Reload with current filters
                  </Button>
              </div>

            </div>
          </div>

          <div className="col">
            <div className="row">

              <div className="col">
                <Form>
                  <Form.Group controlId="SelectCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      value={(filters.country !== '' ? filters.country : 0)}
                      onChange={countryFilterHandler}
                      as="select"
                      custom
                    >
                      {countryOptionsArray}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
              <div className="col">
                <Form>
                  <Form.Group controlId="SelectCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      value={((filters.category) ? filters.category : 0)}
                      onChange={categoryFilterHandler}
                      as="select"
                      custom
                    >
                      {categoryOptionsArray}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
              <div className="col">
                <Form>
                  <Form.Group controlId="SelectState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      value={filters.state}
                      onChange={stateFilterHandler}
                      as="select"
                      custom
                    >
                      {StateToText.map((value, key) => (
                        <option key={value} value={key}>{value}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>

              <div className="col">
                <Form>
                  <Form.Group controlId="SelectLeague">
                    <Form.Label>League</Form.Label>
                    <Form.Control
                      className="w-100"
                      value={filters.league}
                      onChange={leagueFilterHandler}
                      as="input"
                      custom
                    >

                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
            </div>




            <BetTable
              account={account}
              betData={data && { data }}
              error={error}
              loading={loading}
              backBetHandler={backBetHandler}
              voteHandler={voteHandler}
              disputeBetHandler={disputeBetHandler}
              refundBetHandler={refundBetHandler}
              claimWinningsHandler={claimWinningsHandler}
              filters={filters}
              handleOpenEvidenceModal={handleOpenEvidenceModal}
            />


          </div>
        </div>
      </div>
      <Modal
        show={showTransactionModal}
        handleCloseModal={handleCloseTransactionModal}
        handleRedirect={handleRedirect}
        handleSucceeded={handleCloseTransactionModal}
        transacting={transacting}
        success={transactionSuccess}
        error={transactionError}
        title={"Transaction"}
        successText={"Transaction successful!"}
        successButtonText={"Close"} />

      <EvidenceModal
        show={showEvidenceModal}
        handleSubmitEvidence={handleSubmitEvidence}
        handleCloseModal={handleCloseEvidenceModal}
        handleRedirect={handleRedirect}
        transacting={evidenceTransacting}
        success={evidenceSuccess}
        error={evidenceError}
        errorText={evidenceErrorText}
        title={"Submit evidence to court"}
        successText={"Evidence submitted successfully!"}
        sendTransactionText={"Submit evidence"}
        input={evidenceInput}
        setInput={setEvidenceInput}
      />
    </div>
  );
}
