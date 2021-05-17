import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PageCover from '../../components/Layout/PageCover';

import { countryOptionsArray, categoryOptionsArray } from '../../const/filterMappings';

import resolveFilterVariablesForQuery from '../../interaction/filterBooleanResolver';

import EventTable from '../../components/EventTable';
import {STATE_OPEN} from '../../const/contractEnums';
import { useQuery, useLazyQuery } from '@apollo/client';

import { EVENTS_QUERY } from '../../const/queries'

export default function Homepage({ account, filters, setFilters }) {

  // We differentiate the query variables from the state variables because
  // they cannot be null on query, whereas we want the filters to be null
  // when there are no selections
  let defaultVariables = {
    country: 0,
    category: 0,
    league: 'undefined',
    noParams: true,
    countryB: false,
    categoryB: false,
    leagueB: false,
    countryCategoryB: false,
    countryLeagueB: false,
    categoryLeagueB: false,
    countryCategoryLeagueB: false,
  }

  const { loading, error, data, refetch } = useQuery(EVENTS_QUERY, {
    variables: defaultVariables,
    notifyOnNetworkStatusChange: true
  });

  const countryFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.country = e.target.value;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const leagueFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.league = e.target.value;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const categoryFilterHandler = async (e) => {
    await setFilters(filters => {
      filters.category = e.target.value;
      return filters;
    });
    refetch(resolveFilterVariablesForQuery(filters));
  }

  const resetFilters = async () => {
    await setFilters(filters => {
      filters.league = undefined;
      filters.category = '';
      filters.country = '';
      filters.eventID = null;
      return filters;
    });

    refetch(resolveFilterVariablesForQuery(filters));
  }

  const showBetsHandler = async (eventID) => {
    await setFilters(filters => {
      filters.eventID = eventID;
      filters.country = '';
      filters.category = '';
      filters.league = undefined;
      filters.state = STATE_OPEN;
      return filters;
    });
  }

  return (
    <div className="homepage">
      <PageCover description={"Search upcoming events"} />
      <div className="mt-5 container">
        <div className="row">
          <Link to="/create-bet" className="btn btn-danger btn-block">
            Create a Bet
          </Link>
          <div className="col-lg-3 offset-lg-0 col-sm-1">
            <Button variant="warning" onClick={resetFilters}>
              Show all events
             </Button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-14">
            <div className="row">
              <div className="col-lg-3 col-sm-3">
                <Form>
                  <Form.Group controlId="SelectCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      value={filters.country}
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
                      value={filters.category}
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
                      value={(filters.league ? filters.league : '')}
                      onChange={leagueFilterHandler}
                      as="input"
                      custom
                    >

                    </Form.Control>
                  </Form.Group>
                </Form>
              </div>
            </div>
            {error && <div><p>Error loading data</p></div>}
            <div className="bet-tab">
              <EventTable betData={data && { data }} error={error} loading={loading} showBetsHandler={showBetsHandler} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
