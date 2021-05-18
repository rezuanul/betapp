import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PageCover from '../../components/Layout/PageCover';

import { countryOptionsArray, categoryOptionsArray } from '../../const/filterMappings';

import resolveFilterVariablesForQuery from '../../interaction/filterBooleanResolver';

import EventTable from '../../components/EventTable';
import { STATE_OPEN } from '../../const/contractEnums';

export default function Homepage({ account, filters, setFilters, loading, error, data, refetch }) {

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
    e.target.value = filters.league
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

  const resetFilters = async () => {
    await setFilters(filters => {
      filters.league = '';
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
      filters.league = '';
      filters.state = STATE_OPEN;
      return filters;
    });
  }

  const reloadHandler = async () => {
    refetch(resolveFilterVariablesForQuery(filters));
  }

  return (
    <>
      <PageCover description={"Search upcoming events"} />
      <div className="homepage">
        <div className="mt-5 container">
          <div className="row">
            <Link to="/create-bet" className="btn btn-danger btn-block">
              Create a Bet
          </Link>
            <div className="col-lg-3 offset-lg-0 col-sm-1 mt-3 mr-3">
              <Button variant="warning" onClick={resetFilters}>
                Show all events
             </Button>
            </div>
            <div className="col-lg-3 offset-lg-0 col-sm-1 mt-3 ml-3">
              <Button variant="outline-primary" onClick={reloadHandler}>
                Reload with current filters
             </Button>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
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
              {error && <div><p>Error loading data</p></div>}
              <div className="bet-tab">
                <EventTable betData={data && { data }} error={error} loading={loading} showBetsHandler={showBetsHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
