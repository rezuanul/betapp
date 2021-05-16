import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { countryOptionsArray, categoryOptionsArray } from '../../const/filterMappings'

import EventTable from '../../components/EventTable';
import { useQuery } from '@apollo/client';

import { EVENTS_QUERY } from '../../const/queries'

export default function Homepage({ account, filters, setFilters }) {
  const [activeTab, setActiveTab] = useState('link-1');

  const { loading, error, data, refetch } = useQuery(EVENTS_QUERY, {
    variables: filters,
    notifyOnNetworkStatusChange: true
  });

  const updateFilters = () => {

  }

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
    <div className="homepage">
      <section className="bet-section mb-n5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center">
                <h2 className="text-primary">Bet & Play Now</h2>
              </div>
            </div>
          </div>
          <Link to="/create-bet" className="btn btn-danger btn-block">
            Create Bet
          </Link>
          <div className="col-lg-3 offset-lg-0 col-sm-1">
            <Button variant="warning" onClick={resetFilters}>
              Reset filters
                   </Button>
          </div>
          <div className="row">
            <div className="col-lg-14">
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
              <div className="bet-tab">
                <EventTable betData={data && { data }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
