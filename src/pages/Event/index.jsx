import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap';
import BetTable from '../../components/BetTable';
import PageCover from '../../components/Layout/PageCover';
import Modal from '../../components/Modal';
import { useHistory } from 'react-router-dom';

import { useQuery, gql } from '@apollo/client';
import { countryOptionsArray, categoryOptionsArray } from '../../const/filterMappings';
import { GET_BETS } from '../../const/queries';
import resolveFilterVariablesForQuery from '../../interaction/filterBooleanResolver';
import { StateToText, STATE_DISAGREEMENT, STATE_OPEN } from '../../const/contractEnums'


export default function Event({ betContract, arbitratorContract, account, filters, setFilters, archon, ipfsClient }) {

  const { loading, error, data, refetch, networkStatus } = useQuery(GET_BETS,
    {
      variables: resolveFilterVariablesForQuery(filters)
    });

  // MODAL
  ////////////////////////////////
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [transacting, setTransacting] = useState(false);
  const [transactionError, setTransactionError] = useState(false);


  const handleCloseModal = () => {
    setShow(false);
    setTransacting(false);
    setTransactionSuccess(false);
    setTransactionError(false);
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const handleOpenModal = () => {
    setShow(true);
    setTransacting(true);
    setTransactionSuccess(false);
    setTransactionError(false);
  };


  const handleRedirect = () => {
    setShow(false);
    refetch(resolveFilterVariablesForQuery(filters));
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


  // Filter handlers
  /////////////////////////////////////

  const countryFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.country = e.target.value;
      filters.eventID = null;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const leagueFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.league = e.target.value;
      filters.eventID = null;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const categoryFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.category = e.target.value;
      filters.eventID = null;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const stateFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.state = parseInt(e.target.value);
      filters.eventID = null;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const resetFilters = async () => {
    await setFilters(filters => {
      filters.league = undefined;
      filters.category = '';
      filters.country = '';
      filters.state = STATE_OPEN;
      filters.eventID = null;
      return filters;
    });

    refetch(resolveFilterVariablesForQuery(filters));
  }

  const yourBetsHandler = async (e) => {
    if (filters.account === account) {
      await setFilters(filters => {
        filters.account = '';
        return filters;
      });
      e.target.innerText = 'Show your bets';
    } else {
      await setFilters(filters => {
        filters.account = account;
        return filters;
      });
      e.target.innerText = 'Show all bets';
    }
    refetch(resolveFilterVariablesForQuery(filters));
  }

  // Contract call handlers 
  /////////////////////////////////////////////
  const backBetHandler = async (betID, stake) => {
    handleOpenModal();
    betContract.methods
      .placeBet(betID)
      .send({ from: account, value: stake })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());

  }

  const voteHandler = async (betID, outcome) => {
    handleOpenModal();
    betContract.methods
      .voteOnOutcome(betID, outcome)
      .send({ from: account })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }
  const disputeBetHandler = async (betID) => {
    handleOpenModal();
    let arbitrationCost = await arbitratorContract.methods.arbitrationCost("0x00").call();
    betContract.methods
      .createDispute(betID)
      .send({ from: account, value: arbitrationCost })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }
  const refundBetHandler = async (betID) => {
    handleOpenModal();
    betContract.methods
      .refund(betID)
      .send({ from: account })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }
  const claimWinningsHandler = async (betID) => {
    handleOpenModal();
    betContract.methods
      .claimWinnings(betID)
      .send({ from: account })
      .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
  }

  return (
    <div>
      <PageCover description={"Search and Back bets"} />
      <div className="mt-5 container">
        <div className="row">
          <Link to="/create-bet" className="btn btn-danger btn-block">
            Create a Bet
          </Link>
        </div>
        <div className="col-lg-3 offset-lg-0 col-sm-1">
          <Button variant="warning" onClick={resetFilters}>
            Reset filters
          </Button>
          <Button variant="info" onClick={yourBetsHandler}>
            Show your bets
          </Button>
        </div>
        <div className="row">
          <div className="col">
            <Form>
              <Form.Group controlId="SelectCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  value={((filters.country) ? filters.country : 0)}
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
              <Form.Group controlId="SelectCategory">
                <Form.Label>State</Form.Label>
                <Form.Control
                  value={filters.state}
                  onChange={stateFilterHandler}
                  as="select"
                  custom
                >
                  {StateToText.map((value, key) => (
                    <option value={key}>{value}</option>
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
        <div className="row">
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
          />
        </div>
      </div>
      <Modal show={show}
        handleCloseModal={handleCloseModal}
        handleRedirect={handleRedirect}
        handleSucceeded={handleCloseModal}
        transacting={transacting}
        success={transactionSuccess}
        error={transactionError}
        title={"Transaction"}
        successText={"Transaction successful!"}
        successButtonText={"Close"} />
    </div>
  );
}
