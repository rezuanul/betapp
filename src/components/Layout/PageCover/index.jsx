import React from 'react';
import classnames from 'classnames';

import styles from './Cover.module.scss';

export default function index({ country, category, description }) {
  return (
    <div>
      <div
        className={classnames(
          styles.cover,
          'd-flex flex-column justify-content-center align-items-center'
        )}
      >
        <div>
          <h1>{description}</h1>
          <h2>{country}</h2>
          <h3>{category}</h3>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
