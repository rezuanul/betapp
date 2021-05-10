import React from 'react';
import { BiFootball } from 'react-icons/bi';

export default function StatsTable() {
  const data = [1].map(() => ({
    team1Name: 'Barcelona',
    team2Name: 'Real Madrid',
    team1Score: 2,
    team2Score: 2,
    totalBets: 19,
  }));

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead class="bg-primary text-white font-bold">
          <tr>
            <th className="team-name">Team Name</th>
            <th className="goal">Goals</th>
          </tr>
        </thead>
        <tbody>
          {data.map((el, index) => (
            <tr key={index}>
              <td>
                <div className="team-name-part d-flex">
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
                <div className="score">
                  <span className="d-block">{el.team1Score}</span>
                  <span className="d-block">{el.team2Score}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
