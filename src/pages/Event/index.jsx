import React from 'react';
import { Link } from 'react-router-dom';

import BetTable from '../../components/BetTable';
import PageCover from '../../components/Layout/PageCover';

export default function Event({ betContract, account, filters, setFilters, archon, ipfsClient }) {
  return (
    <div>
      <PageCover description="Barcelona vs Real Madrid" category="Football" country="Spain" />
      <Link to="/create-bet" className="btn btn-danger btn-block">
        Create Bet
      </Link>
      <div className="mt-5 container">
        <div className="row">
          <div className="col-md-12">
            <h3>Bets</h3>
          </div>
        </div>

        <div className="row">
          <BetTable account={account} betContract={betContract} />
        </div>
      </div>
    </div>
  );
}
