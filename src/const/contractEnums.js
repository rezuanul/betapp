export const NO_OUTCOME = 0;
export const CREATOR_WINS = 1;
export const BACKER_WINS = 2;

export const STATE_OPEN = 0;
export const STATE_VOTING = 1;
export const STATE_AGREEMENT = 2;
export const STATE_DISAGREEMENT = 3;
export const STATE_DISPUTED = 4;
export const STATE_RESOLVED = 5;
export const STATE_REFUNDED = 6;

export const StateValueArray = [STATE_OPEN, STATE_VOTING, STATE_AGREEMENT, STATE_DISAGREEMENT, STATE_DISPUTED , STATE_RESOLVED , STATE_REFUNDED];

export const StateToText = ["Open", "Voting", "Agreement", "Disagreement", "Disputed", "Resolved", "Refunded"];

export const OutcomeToText = ["Undecidable", "Creator Wins", "Backer Wins"];