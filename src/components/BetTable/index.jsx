import React from 'react';
import { categoryOptions, countryOptions, MAX_CATEGORY, MAX_COUNTRY } from '../../const/filterMappings';
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
    STATE_REFUNDED,
    OutcomeToText
} from '../../const/contractEnums';

const ETH = 1000000000000000000;

export default function BetTable({
    betData,
    error,
    loading,
    account,
    backBetHandler,
    voteHandler,
    disputeBetHandler,
    refundBetHandler,
    claimWinningsHandler,
    filters,
    handleOpenEvidenceModal
}) {

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-bordered" style={{ textAlign: "center" }}>
                    <thead className="bg-primary text-white font-bold">
                        <tr>
                            <th style={{ textAlign: "left" }}>Event</th>
                            <th>
                                <div>Starts</div>
                                <div>----------</div>
                                <div>Voting ends</div>
                            </th>
                            <th>Creator Bet</th>
                            <th>
                                <div> Creator</div>
                                <div>---------</div>
                                <div>Backer</div>
                            </th>
                            {/*<th>Backer odd</th>*/}
                            <th>
                                <div>Stake:</div>
                                <div>Creator</div>
                                <div>Backer</div>
                                <div>---------</div>
                                <div>Total (ETH)</div>
                            </th>
                            <th>
                                <div>Creator</div>
                                <div>Odd</div>
                                <div>Prob</div>
                                <div>-------</div>
                                <div>Backer</div>
                                <div>Odd</div>
                                <div>Prob</div>
                            </th>
                            <th>
                                <div>Country</div>
                                <div>--------</div>
                                <div>Category</div>
                                <div>--------</div>
                                <div>League</div>
                            </th>
                            {filters.state === STATE_VOTING && <th>Time left to vote</th>}
                            {(filters.state === STATE_AGREEMENT || filters.state === STATE_RESOLVED) && <th>Outcome</th>}
                            {filters.state === STATE_DISAGREEMENT && <th>Disagreement</th>}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(betData && betData.data && betData.data.bets) && betData.data.bets.length === 0 && <span>No bets found. Check your filters?</span>}
                        {(betData && betData.data && betData.data.bets) && betData.data.bets.map((bet) => (
                            <tr key={bet.id}>

                                <td style={{ textAlign: "left", wordWrap: "anywhere" }}>
                                    <div className="d-flex">
                                        <div className="content">
                                            <span className="name d-block">{bet.description}</span>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <span className="d-block">{new Date(bet.stakingDeadline * 1000).toISOString().slice(0, 16).replace("T", " ")}</span>
                                    </div>
                                    <div>----------------</div>
                                    <div>
                                        <span className="d-block">{new Date(bet.votingDeadline * 1000).toISOString().slice(0, 16).replace("T", " ")}</span>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <span className="name d-block">{bet.creatorBetDescription}</span>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <span className="name d-block">
                                            <a href={'https://etherscan.io/address/' + bet.creator}>
                                                {bet.creator.slice(0, 5) + '...' + bet.creator.slice(-3, bet.creator.length)}
                                                {bet.creator === account && '(You)'}
                                            </a> <div>----------</div> {bet.backer === "0x0000000000000000000000000000000000000000" && "Open!"}
                                            {bet.backer !== "0x0000000000000000000000000000000000000000" &&
                                                <a href={'https://etherscan.io/address/' + bet.backer}>
                                                    {bet.backer.slice(0, 5) + '...' + bet.backer.slice(-3, bet.backer.length)}
                                                    {bet.backer === account && '(You)'}
                                                </a>}
                                        </span>
                                    </div>
                                </td>

                                <td>

                                    <div>
                                        <span className="name d-block">{bet.creatorStake > 0 ? (bet.creatorStake / ETH).toPrecision(5) : "Refunded"} </span>
                                    </div>
                                    <div>
                                        <span className="name d-block">{bet.backerStake > 0 ? (bet.backerStake / ETH).toPrecision(5) : "Refunded"} </span>
                                    </div>
                                    <div>---------</div>
                                    <div>
                                        <span className="name d-block">
                                            {bet.creatorStake > 0 && bet.backerStake > 0 ? ((bet.backerStake / ETH) + (bet.creatorStake / ETH)).toPrecision(5) : "Refunded"} </span>
                                    </div>
                                </td>

                                <td>

                                    <div>
                                        <span className="name d-block">
                                            {bet.creatorStake > 0 && bet.backerStake > 0 ? (1 / ((bet.creatorStake / ETH) / ((bet.backerStake / ETH) + (bet.creatorStake / ETH)))).toPrecision(6) : "Refunded"} </span>
                                    </div>
                                    <div>
                                        <span className="name d-block">
                                            {bet.creatorStake > 0 && bet.backerStake > 0 ? (((bet.creatorStake / ETH) / ((bet.backerStake / ETH) + (bet.creatorStake / ETH)))).toPrecision(5) : "Refunded"} </span>
                                    </div>
                                    <div>---------</div>
                                    <div>
                                        <span className="name d-block">
                                            {bet.backerStake > 0 && bet.creatorStake > 0 ? (1 / ((bet.backerStake / ETH) / ((bet.backerStake / ETH) + (bet.creatorStake / ETH)))).toPrecision(5) : "Refunded"} </span>
                                    </div>
                                    <div>
                                        <span className="name d-block">
                                            {bet.backerStake > 0 && bet.creatorStake > 0 ? (((bet.backerStake / ETH) / ((bet.backerStake / ETH) + (bet.creatorStake / ETH)))).toPrecision(5) : "Refunded"} </span>
                                    </div>
                                </td>

                                <td>
                                    <div>
                                        <span className="name d-block">{(bet.country <= MAX_COUNTRY ? countryOptions[bet.country].label : "Invalid Country")}</span>
                                    </div>
                                    <div>--------</div>
                                    <div>
                                        <span className="name d-block">{(bet.category <= MAX_CATEGORY ? categoryOptions[bet.category].label : "Invalid Category")}</span>
                                    </div>
                                    <div>--------</div>
                                    <div>
                                        <span className="name d-block">{bet.league}</span>
                                    </div>
                                </td>

                                { filters.state === STATE_VOTING &&
                                    (((bet.votingDeadline - (new Date().getTime() / 1000)) / 3600) > 0 ?
                                        <td>
                                            <div>
                                                <span className="name d-block">{((bet.votingDeadline - (new Date().getTime() / 1000)) / 3600).toFixed(2)} h</span>
                                            </div>
                                        </td>
                                        :
                                        <td>
                                            <div>
                                                <span className="name d-block">Voting ended</span>
                                            </div>
                                        </td>
                                    )
                                }

                                { (filters.state === STATE_AGREEMENT || filters.state === STATE_RESOLVED) &&
                                    <td>
                                        <div>
                                            <span className="name d-block">{OutcomeToText[bet.outcome]}</span>
                                        </div>
                                    </td>
                                }

                                { filters.state === STATE_DISAGREEMENT &&
                                    <td>
                                        <div>
                                            <span className="name d-block">Players did not agree on the result. A player can send the bet to arbitration!</span>
                                        </div>
                                    </td>
                                }

                                <td>
                                    <div className="col px-2">
                                        {(bet.state === STATE_OPEN
                                            && bet.stakingDeadline > new Date().getTime() / 1000
                                            && bet.creator !== account) &&
                                            <button id="backBet" onClick={() => backBetHandler(bet.id, bet.backerStake)} className="btn btn-info btn-block">
                                                Back Bet
                                        </button>}

                                        {(bet.state === STATE_OPEN
                                            && bet.stakingDeadline > new Date().getTime() / 1000
                                            && bet.creator === account) &&
                                            <div>
                                                <span>You can't back your own bet</span>
                                            </div>
                                        }


                                        {((bet.state === STATE_VOTING && bet.votingDeadline > new Date().getTime() / 1000)
                                            && (bet.creator === account || bet.backer === account) // OnlyPlayers
                                            && !((bet.creator === account && bet.creatorHasVoted) || (bet.backer === account && bet.backerHasVoted)))
                                            &&
                                            <div>
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

                                        }

                                        {// Show voted if State voting and the player has voted
                                            (bet.state === STATE_VOTING
                                                && ((bet.creator === account && bet.creatorHasVoted) || (bet.backer === account && bet.backerHasVoted)))
                                            && <p>Voted</p>
                                        }

                                        {(bet.state === STATE_DISAGREEMENT && (bet.creator === account || bet.backer === account)) &&
                                            <button id="dispute" onClick={() => disputeBetHandler(bet.id)} className="btn btn-danger btn-block">
                                                Dispute
                                            </button>}

                                        {((bet.outcome === NO_OUTCOME)
                                            && ((bet.state === STATE_VOTING && bet.votingDeadline < new Date().getTime() / 1000)
                                                || bet.state === STATE_AGREEMENT
                                                || (bet.state === STATE_OPEN && bet.stakingDeadline < new Date().getTime() / 1000)
                                            ) // Voting ended, there was an agreement or there was no other player
                                            && ((bet.creator === account && bet.creatorStake !== 0) || (bet.backer === account && bet.backerStake !== 0))) &&
                                            <div>
                                                {bet.state !== STATE_OPEN && (!bet.creatorHasVoted && !bet.backerHasVoted) && <p>No players voted </p>}
                                                {bet.state !== STATE_OPEN && (bet.backerHasVoted && bet.creatorHasVoted) && <p>Undedicable</p>}
                                                {bet.state === STATE_OPEN && <p>No player backed the bet in time</p>}
                                                <button id="refund" onClick={() => refundBetHandler(bet.id)} className="btn btn-warning btn-block">
                                                    Refund
                                                </button>
                                            </div>
                                        }

                                        {bet.state === STATE_OPEN
                                            && bet.stakingDeadline < new Date().getTime() / 1000
                                            && bet.creator !== account &&
                                            <div>
                                                <span>Closed, event started</span>
                                            </div>
                                        }

                                        {((bet.outcome === NO_OUTCOME)
                                            && ((bet.state === STATE_VOTING && bet.votingDeadline < new Date().getTime() / 1000)
                                                || bet.state === STATE_AGREEMENT
                                                || (bet.state === STATE_OPEN && bet.stakingDeadline < new Date().getTime() / 1000)
                                            ) // Voting ended, there was an agreement or there was no other player
                                            && ((bet.creator === account && bet.creatorStake === 0) || (bet.backer === account && bet.backerStake === 0))) &&
                                            <div>
                                                <p>You refunded</p>
                                            </div>
                                        }

                                        {((bet.state === STATE_AGREEMENT
                                            || (bet.state === STATE_VOTING && bet.votingDeadline < new Date().getTime() / 1000))
                                            && ((bet.creator === account && bet.outcome === CREATOR_WINS)
                                                || (bet.backer === account && bet.outcome === BACKER_WINS))) &&
                                            <button id="claimWinnings" onClick={() => claimWinningsHandler(bet.id)} className="btn btn-success btn-block">
                                                ClaimWinnings
                                            </button>}

                                        {(bet.outcome !== NO_OUTCOME // Show lost to losing player if only one player voted either backer wins or creator wins
                                            && (bet.state === STATE_AGREEMENT
                                                || (bet.state === STATE_VOTING && bet.votingDeadline < new Date().getTime() / 1000))
                                            && ((bet.creator === account && bet.outcome !== CREATOR_WINS)
                                                || (bet.backer === account && bet.outcome !== BACKER_WINS))) &&
                                            <p>You lost</p>}

                                        {bet.state === STATE_REFUNDED && <p>Refunded</p>}

                                        {(bet.state === STATE_RESOLVED ?
                                            ((bet.creator === account || bet.backer === account) ?
                                                ((bet.state === STATE_RESOLVED
                                                    && ((bet.creator === account && bet.outcome === CREATOR_WINS)
                                                        || (bet.backer === account && bet.outcome === BACKER_WINS)))
                                                    ? <p>You won</p>
                                                    : <p>You lost</p>)
                                                : <p>Resolved</p>)
                                            : ""
                                        )
                                        }

                                        {bet.state === STATE_DISPUTED
                                            &&
                                            <div>
                                                <a href={"https://court.kleros.io/cases/" + bet.disputeID} target="_blank">In arbitration</a>
                                            </div>
                                        }

                                        {(bet.state === STATE_DISPUTED
                                            && ((bet.creator == account && !bet.creatorProvidedEvidence) || (bet.backer === account && !bet.backerProvidedEvidence)))
                                            &&
                                            <div>
                                                <button id="submitEvidence" onClick={() => handleOpenEvidenceModal(bet.id)} className="btn btn-light btn-block">
                                                    Submit evidence
                                                </button>
                                            </div>
                                        }

                                        {(bet.state === STATE_DISPUTED
                                            && ((bet.creator == account && bet.creatorProvidedEvidence) || (bet.backer === account && bet.backerProvidedEvidence)))
                                            &&
                                            <div>
                                                <span>You have provided evidence</span>
                                            </div>}

                                    </div>
                                </td>
                            </tr>
                        ))}
                        {loading &&
                            <tr>
                                <td colSpan={8}>
                                    <div className="d-flex">
                                        <div className="content">
                                            <span className="name d-block">{'Loading bets'}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        }
                        {error &&
                            <tr>
                                <td colSpan={8}>
                                    <div className="d-flex">
                                        <div className="content">
                                            <span className="name d-block">{'An error happened while loading the bets'}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
}
