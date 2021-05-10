import React from 'react';
import { Link } from 'react-router-dom';
import { BiFootball } from 'react-icons/bi';

export default function EventTable() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8].map(() => ({
    eventDescription: 'Barcelona vs Real Madrid',
    eventDate: new Date().toISOString().slice(0,16),
    totalBetsUnderEvent: 19,
  }));

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead class="bg-primary text-white font-bold">
          <tr>
            <th>Event</th>
            <th>Date</th>
            <th>Bets</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex">
                  <div className="content">
                    <span className="name d-block">{el.eventDescription}</span>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <span className="d-block">{el.eventDate}</span>
                </div>
              </td>
              <td>
                <span>{el.totalBetsUnderEvent}</span>
              </td>
              <td>
                <Link to="/event" className="btn btn-danger">
                  Show Bets
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
