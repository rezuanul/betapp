import React, { useState } from 'react';
import Modal from '../../components/Modal';
import { categoryOptions, countryOptions } from '../../const/filterMappings';

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

export default function BetTable({ betContract, account, betData }) {

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

    const handleOpenModal = () => {
        setShow(true);
        setTransacting(true);
        setTransactionSuccess(false);
        setTransactionError(false);
    };


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
        handleOpenModal();
        betContract.methods
            .placeBet(betID)
            .send({ from: account, value: stake })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());

    }

    const layerWinsHandler = async (betID) => {
        handleOpenModal();
        betContract.methods
            .voteOnOutcome(betID, CREATOR_WINS)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const backerWinsHandler = async (betID) => {
        handleOpenModal();
        betContract.methods
            .voteOnOutcome(betID, BACKER_WINS)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const disputeBetHandler = async (betID) => {
        handleOpenModal();
        betContract.methods
            .createDispute(betID)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const refundBetHandler = async (betID) => {
        handleOpenModal();
        betContract.methods
            .refund(betID)
            .send({ from: account })
            .then((res) => handleTransactionSuccessful(), (res) => handleTransactionError());
    }
    const claimWinningsHandler = async (betID) => {
        handleOpenModal();
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
                                                {bet.creator == account && '(You)'}
                                            </a>
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <span className="name d-block">{(bet.creatorStake / 1000000000000000000)} ETH </span>
                                    </div>
                                </td>
                                {
                                    bet.backer == "0x0000000000000000000000000000000000000000" &&
                                    <td>
                                        <div>
                                            <span className="name d-block"> You can be one! </span>
                                        </div>
                                    </td>
                                }

                                {
                                    bet.backer != "0x0000000000000000000000000000000000000000" &&
                                    <td>
                                        <div>
                                            <span className="name d-block">
                                                <a href={'https://etherscan.io/address/' + bet.backer}>
                                                    {bet.backer.slice(0, 5) + '...' + bet.backer.slice(-3, bet.backer.length)}
                                                    {bet.backer == account && '(You)'}
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
                                        {bet.state == STATE_OPEN &&
                                            <button id="backBet" onClick={() => backBetHandler(bet.id, bet.backerStake)} className="btn btn-danger btn-block">
                                                Back Bet
                                    </button>}
                                        {/* add check for if player already voted in sub graph */}
                                        {(bet.state == STATE_VOTING && (bet.creator == account || bet.backer == account)) &&
                                            <button id="layerWins" onClick={() => layerWinsHandler(bet.id)} className="btn btn-danger btn-block">
                                                Layer wins
                                    </button>}
                                        {/* add check for if player already voted in sub graph */}
                                        {(bet.state == STATE_VOTING && (bet.creator == account || bet.backer == account)) &&
                                            <button id="backerWins" onClick={() => backerWinsHandler(bet.id)} className="btn btn-danger btn-block">
                                                Backer wins
                                    </button>}
                                        {(bet.state == STATE_DISAGREEMENT && (bet.creator == account || bet.backer == account)) &&
                                            <button id="dispute" onClick={() => disputeBetHandler(bet.id)} className="btn btn-danger btn-block">
                                                Dispute
                                    </button>}
                                        {/* {((bet.outcome == NO_OUTCOME) && ((bet.state == STATE_VOTING && bet.votingDeadline < parseInt((Date.now().getTime() / 1000).toFixed(0)))
                                            || bet.state == STATE_AGREEMENT
                                            || (bet.state == STATE_OPEN && bet.stakingDeadline < parseInt((Date.now().getTime() / 1000).toFixed(0)))
                                        )
                                            && (bet.creator == account || bet.backer == account)) &&
                                            <button id="refund" onClick={() =>refundBetHandler(bet.id)} className="btn btn-danger btn-block">
                                                Refund
                                            </button>
                                        } */}
                                        {(bet.state == STATE_AGREEMENT && (bet.creator == account || bet.backer == account)) &&
                                            <button id="claimWinnings" onClick={() => claimWinningsHandler(bet.id)} className="btn btn-danger btn-block">
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