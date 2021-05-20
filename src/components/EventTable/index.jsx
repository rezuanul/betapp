import React from 'react';
import { Link } from 'react-router-dom';
import { categoryOptions, countryOptions, MAX_CATEGORY, MAX_COUNTRY } from '../../const/filterMappings';

export default function EventTable({ betData, error, loading, showBetsHandler }) {

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped table-bordered" style={{ textAlign: "center" }}>
          <thead className="bg-primary text-white font-bold">
            <tr>
              <th style={{ textAlign: "left" }}>Event</th>
              <th>Date</th>
              <th>Start time</th>
              <th>Country</th>
              <th>Category</th>
              <th>League</th>
              <th>Bets</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Just to be sure that we don't crash */}
            {(betData && betData.data && betData.data.events) && betData.data.events.map((event, key) => (
              <tr key={key}>

                <td style={{ textAlign: "left" }}>
                  <div className="d-flex">
                    <div className="content">
                      <span className="name d-block">{event.description}</span>
                    </div>
                  </div>
                </td>

                <td>
                  <div>
                    <span className="d-block">{new Date(event.startTime * 1000).toISOString().slice(0, 10)}</span>
                  </div>
                </td>

                <td>
                  <div>
                    <span className="d-block">{new Date(event.startTime * 1000).toISOString().slice(-13, -8)}</span>
                  </div>
                </td>

                <td>
                  <div>
                    <span className="name d-block">{(event.country <= MAX_COUNTRY ? countryOptions[event.country].label : "Invalid Country")}</span>
                  </div>
                </td>

                <td>
                  <div>
                    <span className="name d-block">{(event.category <= MAX_CATEGORY ? categoryOptions[event.category].label : "Invalid Category")}</span>
                  </div>
                </td>

                <td>
                  <div>
                    <span className="name d-block">{event.league}</span>
                  </div>
                </td>

                <td>
                  {event.bets && <span>{event.bets.length}</span>}
                  {!event.bets && <span>0</span>}

                </td>

                <td>
                  <Link to="/event" className="btn btn-primary" onClick={() => showBetsHandler(event.id)}>
                    Show Bets
                </Link>
                </td>
              </tr>
            ))}
            {loading &&
              <tr>
                <td colSpan={8}>
                  <div className="d-flex">
                    <div className="content">
                      <span className="name d-block">{'Loading events'}</span>
                    </div>
                  </div>
                </td>
              </tr>}
            {error &&
              <tr>
                <td colSpan={8}>
                  <div className="d-flex">
                    <div className="content">
                      <span className="name d-block">{'An error happened while loading the events'}</span>
                    </div>
                  </div>
                </td>
              </tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}
