import React from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import BetTable from '../../components/BetTable';
import PageCover from '../../components/Layout/PageCover';
import { useQuery, gql } from '@apollo/client';

import { countryOptionsArray, categoryOptionsArray } from '../../const/filterMappings';
import { GET_BETS } from '../../const/queries';



export default function Event({ betContract, account, filters, setFilters, archon, ipfsClient }) {


    let EventID = {
        id: filters.eventID
    };


    const { loading, error, data, refetch, networkStatus } = useQuery(GET_BETS, { variables: EventID });

  const countryFilterHandler = (e) => {
    setFilters({
      ...filters,
      country: e.target.value
    })
  }

  const leagueFilterHandler = (e) => {
    setFilters({
      ...filters,
      league: e.target.value
    })
  }

  const categoryFilterHandler = (e) => {
    setFilters({
      ...filters,
      category: e.target.value
    })
  }

  const resetFilters = () => {

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
        </div>
        <div className="row">
          <div className="col-lg-3 col-sm-3">
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
          <div className="col-lg-3 offset-lg-0 col-sm-3">
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
          <div className="col-lg-1 offset-lg-0 col-sm-1">
            <Form>
              <Form.Group controlId="SelectLeague">
                <Form.Label>League</Form.Label>
                <Form.Control
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
          <BetTable account={account} betContract={betContract} betData={data && { data }} />
        </div>
      </div>
    </div>
  );
}
