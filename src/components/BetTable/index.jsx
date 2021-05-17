import React, { useState } from 'react';
import { categoryOptions, countryOptions } from '../../const/filterMappings';
import {
    NO_OUTCOME,
    BACKER_WINS,
    CREATOR_WINS,
    STATE_OPEN,
    STATE_VOTING,
    STATE_AGREEMENT,
    STATE_DISAGREEMENT,
    STATE_DISPUTED,
    STATE_RESOLVED,
    STATE_REFUNDED
} from '../../const/contractEnums';

export default function BetTable({ betData,
    account,
    backBetHandler,
    voteHandler,
    disputeBetHandler,
    refundBetHandler,
    claimWinningsHandler
}) {

    /*const data = [0, 1, 2, 3, 4, 5, 6, 7].map((idd) => ({
        id: idd,
        description: 'Barcelona vs Real Madrid',
        creatorBetDescription: 'Barcelona Wins',
        stakingDeadline: 1621194871,
        votingDeadline: 1621294871,
        creator: '0x5a7588677f52e522a91cbf31618f6c72dfaa5cc7',
        creatorStake: 1000000000000000000,
        backer: '0x0000000000000000000000000000000000000000',
        backerStake: 11800000000000000000,
        outcome: 0,
        state: 0,
        country: 186,
        category: 4,
        league: 'La Liga',
        disputeID: null,
        _metaEvidence: 'ipfs/kaf324ggmja3432gkmvjfdsnvakfoksdoi325'
    }));*/

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="bg-primary text-white font-bold">
                        <tr>
                            <th>Description</th>
                            <th>Creator</th>
                            <th>Creator Bet</th>
                            {/* <th>Created On</th> */}
                            {/*<th>Time to vote</th> */}
                            <th>Backer</th>
                            {/*<th>Backer odd</th>*/}
                            <th>Backer stake</th>
                            <th>Country</th>
                            <th>Category</th>
                            <th>League</th>
                            {/*<th>Metaevidence</th>
                            <th>Dispute ID</th>*/}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {betData && betData.data.bets.map((bet) => (
                            <tr key={bet.id}>
                                <td>
                                    <div className="d-flex">
                                        <div className="content">
                                            <span className="name d-block">{bet.description}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <span className="name d-block">
                                            <a href={'https://etherscan.io/address/' + bet.creator}>
                                                {bet.creator.slice(0, 5) + '...' + bet.creator.slice(-3, bet.creator.length)}
                                                {bet.creator === account && '(You)'}
                                            </a>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <span className="name d-block">{bet.creatorBetDescription}</span>
                                    </div>
                                </td>
                                {
                                    bet.backer === "0x0000000000000000000000000000000000000000" &&
                                    <td>
                                        <div>
                                            <span className="name d-block"> You can be one! </span>
                                        </div>
                                    </td>
                                }

                                {
                                    bet.backer !== "0x0000000000000000000000000000000000000000" &&
                                    <td>
                                        <div>
                                            <span className="name d-block">
                                                <a href={'https://etherscan.io/address/' + bet.backer}>
                                                    {bet.backer.slice(0, 5) + '...' + bet.backer.slice(-3, bet.backer.length)}
                                                    {bet.backer === account && '(You)'}
                                                </a>
                                            </span>
                                        </div>
                                    </td>
                                }

                                <td>
                                    <div>
                                        <span className="name d-block">{(bet.backerStake / 1000000000000000000)} ETH </span>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <span className="name d-block">{countryOptions[bet.country].label}</span>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <span className="name d-block">{categoryOptions[bet.category].label}</span>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <span className="name d-block">{bet.league}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="col px-2">
                                        {(bet.state === STATE_OPEN
                                            && bet.stakingDeadline > new Date().getTime() / 1000
                                            && bet.creator !== account) &&
                                            <button id="backBet" onClick={() => backBetHandler(bet.id, bet.backerStake)} className="btn btn-primary btn-block">
                                                Back Bet
                                    </button>}
                                        {(bet.state === STATE_VOTING
                                            && (bet.creator === account || bet.backer === account)
                                            && !((bet.creator === account && bet.creatorHasVoted) || (bet.backer === account && bet.backerHasVoted))) ?
                                            (<div>
                                                <button id="creatorWins" onClick={() => voteHandler(bet.id, CREATOR_WINS)} className="btn btn-light btn-block">
                                                    Creator wins
                                                </button>
                                                <button id="backerWins" onClick={() => voteHandler(bet.id, BACKER_WINS)} className="btn btn-light btn-block">
                                                    Backer wins
                                                </button>
                                                <button id="noOutcome" onClick={() => voteHandler(bet.id, NO_OUTCOME)} className="btn btn-light btn-block">
                                                    Undecidable
                                                </button>
                                            </div>
                                            ) : (bet.state === STATE_VOTING && <p>Voted</p>)}

                                        {(bet.state === STATE_DISAGREEMENT && (bet.creator === account || bet.backer === account)) &&
                                            <button id="dispute" onClick={() => disputeBetHandler(bet.id)} className="btn btn-danger btn-block">
                                                Dispute
                                            </button>}
                                        {((bet.outcome === NO_OUTCOME) && ((bet.state === STATE_VOTING && bet.votingDeadline < new Date().getTime() / 1000)
                                            || bet.state === STATE_AGREEMENT
                                            || (bet.state === STATE_OPEN && bet.stakingDeadline < new Date().getTime() / 1000)
                                        )
                                            && (bet.creator === account || bet.backer === account)) &&
                                            <button id="refund" onClick={() => refundBetHandler(bet.id)} className="btn btn-warning btn-block">
                                                Refund
                                            </button>
                                        }
                                        {(bet.state === STATE_AGREEMENT && (bet.creator === account || bet.backer === account)) &&
                                            <button id="claimWinnings" onClick={() => claimWinningsHandler(bet.id)} className="btn btn-success btn-block">
                                                ClaimWinnings
                                    </button>}
                                        {bet.state === STATE_REFUNDED && <p>Refunded</p>}
                                        {bet.state === STATE_RESOLVED && <p>Resolved</p>}
                                        {bet.state === STATE_DISPUTED && <a href={"https://court.kleros.io/cases/" + bet.disputeID}>In arbitration</a>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
