import React from 'react';
import { Link } from 'react-router-dom';

import StatsTable from './StatsTable';
import styles from './Match.module.scss';
import PageCover from '../../components/Layout/PageCover';

export default function FootballMatch() {
  return (
    <div>
      <PageCover leagueName="La Liga" team1="Barcelona" team2="Real Madrid" />

      <div className="mt-5 container">
        <div className="row">
          <div className="col-md-12">
            <h3>Description</h3>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h3>Stats</h3>

            <StatsTable />
          </div>

          <div className="col-md-6">
            <h3>Other Details</h3>

            <ul className={styles.statsUl}>
              <li className={styles.statsLi}>
                <div className={styles.th}>Venue</div>
                <div className={styles.td}>
                  <span className="badge badge-primary">Barcelona</span>
                </div>
              </li>
              <li className={styles.statsLi}>
                <div className={styles.th}>Top Players</div>
                <div className={styles.td}>Top Player Name</div>
              </li>
              <li className={styles.statsLi}>
                <div className={styles.th}>Bets Placed</div>
                <div className={styles.td}>19+</div>
              </li>
            </ul>

            <div className="row mt-2 mx-n2">
              <div className="col px-2">
                <Link to="/match/football/place-bet" className="btn btn-danger btn-block">
                  Place Bet
                </Link>
              </div>
              <div className="col px-2">
                <Link to="/match/football/create-bet" className="btn btn-danger btn-block">
                  Create Bet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
