import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
      filters.account = '';
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
        <div className="col">
          <div className="mt-5 row">

            <div className="col-sm-2">
              <div className="container">

                <div className="btn btn-block mt-3">
                  <Button href="/create-bet" variant="success" block>
                    Create a Bet
                      </Button>
                </div>

                <div className="btn btn-block mt-3">
                  <Button variant="warning" onClick={resetFilters} block>
                    Show all events
                   </Button>
                </div>

                <div className="btn btn-block mt-3">
                  <Button variant="outline-primary" onClick={reloadHandler} block>
                    Reload with current filters
                   </Button>
                </div>

              </div>
            </div>

            <div className="col mt-3">

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
              <EventTable
                betData={data && { data }}
                error={error}
                loading={loading}
                showBetsHandler={showBetsHandler}
              />

            </div>

          </div>
        </div>
      </div>
    </>
  );
}
