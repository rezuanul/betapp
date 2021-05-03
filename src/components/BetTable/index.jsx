import React from 'react';
import { Link } from 'react-router-dom';
import { BiFootball } from 'react-icons/bi';

export default function BetTable() {
  const data = [1, 2, 3, 4, 5, 6, 7, 8].map(() => ({
    team1Name: 'Barcelona',
    team2Name: 'Real Madrid',
    team1Score: 2,
    team2Score: 2,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    totalBets: 19,
  }));

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead class="bg-primary text-white font-bold">
          <tr>
            <th>Team Name</th>
            <th>Goal</th>
            <th>Description</th>
            <th>Total bet</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex">
                  <div className="pt-1 p-2" style={{ fontSize: '25px' }}>
                    <BiFootball />
                  </div>

                  <div className="content">
                    <span className="name d-block">{el.team1Name}</span>
                    <span className="name d-block">{el.team2Name}</span>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <span className="d-block">{el.team1Score}</span>
                  <span className="d-block">{el.team2Score}</span>
                </div>
              </td>
              <td>{el.description}</td>
              <td>
                <span>+19</span>
              </td>
              <td>
                <Link to="/match/football" className="btn btn-danger">
                  Place Bet
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
