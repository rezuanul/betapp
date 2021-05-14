import React from 'react';
import { GiContract } from 'react-icons/gi';

export default function BetTable() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8].map(() => ({
        creatorBetDescription: 'Barcelona Wins',
        stakingDeadline: new Date().toISOString().slice(0, 16),
        backerOdd: '2.000000',
        openStake: '11800000000000000000',
        timeToVote: 24,
    }));

    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead class="bg-primary text-white font-bold">
                    <tr>
                        <th>Creator Bet</th>
                        <th>Deadline</th>
                        <th>Your odd</th>
                        <th>Your stake</th>
                        <th>Time to vote (h)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((el, index) => (
                        <tr key={index}>
                            <td>
                                <div className="d-flex">
                                    <div className="content">
                                        <span className="name d-block">{el.creatorBetDescription}</span>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <span className="d-block">{el.stakingDeadline}</span>
                                </div>
                            </td>
                            <td>
                                <span>{el.backerOdd}</span>
                            </td>
                            <td>
                                <span>{el.openStake}</span>
                            </td>
                            <td>
                                <span>{el.timeToVote}</span>
                            </td>
                            <td>
                                <div className="col px-2">
                                    <button id="backBet" className="btn btn-danger btn-block">
                                        Back Bet
                                    </button>
                                    <button id="layerWins" className="btn btn-danger btn-block">
                                        Layer wins
                                    </button>
                                    <button id="backerWins"  className="btn btn-danger btn-block">
                                        Backer wins
                                    </button>
                                    <button id="dispute" className="btn btn-danger btn-block">
                                        Dispute
                                    </button>
                                    <button refund="refund" onClick="" className="btn btn-danger btn-block">
                                        Refund
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
