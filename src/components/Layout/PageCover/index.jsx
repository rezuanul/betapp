import React from 'react';
import classnames from 'classnames';

import styles from './Cover.module.scss';

export default function index({ leagueName, team1, team2 }) {
  return (
    <div>
      <div
        className={classnames(
          styles.cover,
          'd-flex flex-column justify-content-center align-items-center'
        )}
      >
        <div>
          <h1>{leagueName}</h1>
        </div>
        <div>
          <p>
            {team1} VS {team2}
          </p>
        </div>
      </div>
    </div>
  );
}
