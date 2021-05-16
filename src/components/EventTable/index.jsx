import React from 'react';
import { Link } from 'react-router-dom';

export default function EventTable({ betData, error, loading }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="bg-primary text-white font-bold">
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Bets</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {betData && betData.data.events.map((event, key) => (
            <tr key={key}>
              <td>
                <div className="d-flex">
                  <div className="content">
                    <span className="name d-block">{event.description}</span>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <span className="d-block">{new Date(event.startTime * 1000).toISOString().slice(0, 16).replace("T", " ")}</span>
                </div>
              </td>
              <td>
                {event.bets && <span>{event.bets.length}</span>}
                {!event.bets && <span>0</span>}

              </td>
              <td>
                <Link to="/event" className="btn btn-danger">
                  Show Bets
                </Link>
              </td>
            </tr>
          ))}
          {loading &&
            <tr>
              <td colSpan={4}>
                <div className="d-flex">
                  <div className="content">
                    <span className="name d-block">{'Loading bets'}</span>
                  </div>
                </div>
              </td>
            </tr>}
          {error &&
            <tr>
              <td colSpan={4}>
                <div className="d-flex">
                  <div className="content">
                    <span className="name d-block">{'An error happened while loading the bets bets'}</span>
                  </div>
                </div>
              </td>
            </tr>}
        </tbody>
      </table>
    </div>
  );
}
