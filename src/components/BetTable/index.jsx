import React, { useState } from 'react';
import Modal from '../../components/Modal';

import { useHistory } from 'react-router-dom';

const NO_OUTCOME = 0;
const CREATOR_WINS = 1;
const BACKER_WINS = 2;

const STATE_OPEN = 0;
const STATE_VOTING = 1;
const STATE_AGREEMENT = 2;
const STATE_DISAGREEMENT = 3;
const STATE_DISPUTED = 4;
const STATE_RESOLVED = 5;
const STATE_REFUNDED = 6;

export default function BetTable({ betContract, account }) {

    const data = [0, 1, 2, 3, 4, 5, 6, 7].map((idd) => ({
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
    }));

    const history = useHistory();
    const [show, setShow] = useState(false);
    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [transacting, setTransacting] = useState(false);
    const [transactionError, setTransactionError] = useState(false);


    const handleCloseModal = () => {
        setShow(false);
        setTransacting(false);
        setTransactionSuccess(false);
        setTransactionError(false);
    }

    const handleRedirect = () => {
        setShow(false);
        history.push('/event');
    };

    const handleTransactionError = () => {
        setTransacting(false);
        setTransactionError(true);
    }

    const handleTransactionSuccessful = () => {
        setTransacting(false);
        setTransactionSuccess(true);
    }

    const backBetHandler = async (betID, stake) => {
        betContract.methods
            .placeBet(betID)
            .send({ from: account, value: stake })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }

    const layerWinsHandler = async (betID) => {
        betContract.methods
            .voteOnOutcome(betID, CREATOR_WINS)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const backerWinsHandler = async (betID) => {
        betContract.methods
            .voteOnOutcome(betID, BACKER_WINS)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const disputeBetHandler = async (betID) => {
        betContract.methods
            .createDispute(betID)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const refundBetHandler = async (betID) => {
        betContract.methods
            .refund(betID)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const claimWinningsHandler = async (betID) => {
        betContract.methods
            .claimWinnings(betID)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }

    return (
        <>
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead class="bg-primary text-white font-bold">
                        <tr>
                            <th>Description</th>
                            <th>Creator</th>
                            <th>Creator Bet</th>
                            <th>Start Time</th>
                            <th>Time to vote</th>
                            <th>Your odd</th>
                            <th>Your stake</th>
                            <th>Backer</th>
                            <th>Country</th>
                            <th>Category</th>
                            <th>League</th>
                            <th>State</th>
                            <th>Metaevidence</th>
                            <th>Dispute ID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((bet) => (
                            <tr key={bet.id}>
                                <td>
                                    <div className="d-flex">
                                        <div className="content">
                                            <span className="name d-block">{bet.creatorBetDescription}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <span className="d-block">{bet.stakingDeadline}</span>
                                    </div>
                                </td>
                                <td>
                                    <span>{bet.backerOdd}</span>
                                </td>
                                <td>
                                    <span>{bet.openStake}</span>
                                </td>
                                <td>
                                    <span>{bet.timeToVote}</span>
                                </td>
                                <td>
                                    <div className="col px-2">
                                        {bet.state == STATE_OPEN &&
                                            <button id="backBet" onClick={backBetHandler} className="btn btn-danger btn-block">
                                                Back Bet
                                    </button>}
                                    {/* add check for if player already voted in sub graph */}
                                        {(bet.state == STATE_VOTING && (bet.creator == account || bet.backer == account)) &&
                                            <button id="layerWins" onClick={layerWinsHandler} className="btn btn-danger btn-block">
                                                Layer wins
                                    </button>}
                                    {/* add check for if player already voted in sub graph */}
                                    {(bet.state == STATE_VOTING && (bet.creator == account || bet.backer == account)) &&
                                            <button id="backerWins" onClick={backerWinsHandler} className="btn btn-danger btn-block">
                                                Backer wins
                                    </button>}
                                        {(bet.state == STATE_DISAGREEMENT && (bet.creator == account || bet.backer == account)) &&
                                            <button id="dispute" onClick={disputeBetHandler} className="btn btn-danger btn-block">
                                                Dispute
                                    </button>}
                                        {/* {((bet.outcome == NO_OUTCOME) && ((bet.state == STATE_VOTING && bet.votingDeadline < parseInt((Date.now().getTime() / 1000).toFixed(0)))
                                            || bet.state == STATE_AGREEMENT
                                            || (bet.state == STATE_OPEN && bet.stakingDeadline < parseInt((Date.now().getTime() / 1000).toFixed(0)))
                                        )
                                            && (bet.creator == account || bet.backer == account)) &&
                                            <button id="refund" onClick={refundBetHandler} className="btn btn-danger btn-block">
                                                Refund
                                            </button>
                                        } */}
                                        {(bet.state == STATE_AGREEMENT && (bet.creator == account || bet.backer == account)) &&
                                            <button id="claimWinnings" onClick={claimWinningsHandler} className="btn btn-danger btn-block">
                                                ClaimWinnings
                                    </button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal show={show} handleCloseModal={handleCloseModal} handleRedirect={handleRedirect} handleSucceeded={handleCloseModal} transacting={transacting} success={transactionSuccess} error={transactionError} title={"Transaction"} successText={"Transaction successful!"} />
        </>
    );
}