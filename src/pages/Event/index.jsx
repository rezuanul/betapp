import React from 'react';
import { Link } from 'react-router-dom';

import BetTable from '../../components/BetTable';
import PageCover from '../../components/Layout/PageCover';
import { useQuery, gql } from '@apollo/client';

const _ALL = gql`
    query getAll{
      bets{
        id
        creator
        creatorStake
        backer
        backerStake
        description
        timeCreated
        state
        league
        category
        country
      }
    }
`;

export default function Event({ betContract, account, filters, setFilters, archon, ipfsClient }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(_ALL, { notifyOnNetworkStatusChange: true });

  return (
    <div>
      <PageCover description="Events" />
      <Link to="/create-bet" className="btn btn-danger btn-block">
        Create Bet
      </Link>
      <div className="mt-5 container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Bets</h3>
          </div>
        </div>

        <div className="row">
                  <BetTable account={account} betContract={betContract} betData={data && { data }}/>
        </div>
      </div>
    </div>
  );
}
