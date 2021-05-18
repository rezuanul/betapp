import { gql } from '@apollo/client';


export const EVENTS_QUERY = gql`
    query getEvents($country: Int,
                  $category: Int,
                  $league: String,
                  $minTime: Int,
                  $noParams: Boolean!,
                  $countryB: Boolean!,
                  $categoryB: Boolean!,
                  $leagueB: Boolean!,
                  $countryCategoryB: Boolean!,
                  $countryLeagueB: Boolean!,
                  $categoryLeagueB: Boolean!,
                  $countryCategoryLeagueB: Boolean!
                   ) {
                    
    events(orderBy: startTime, where: {startTime_gt: $minTime}) @include(if: $noParams) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }
                    
    events(where: {country: $country, startTime_gt: $minTime}, orderBy: startTime) @include(if: $countryB) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }
    
    events(where: {category: $category, startTime_gt: $minTime}, orderBy: startTime) @include(if: $categoryB) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }
                    
                        
    events(where: {league_contains: $league, startTime_gt: $minTime}, orderBy: startTime) @include(if: $leagueB) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }
                    
    events(where: { country: $country, category: $category, startTime_gt: $minTime}, orderBy: startTime) @include(if: $countryCategoryB) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }  
  
    events(where: { country: $country, league_contains: $league, startTime_gt: $minTime}, orderBy: startTime) @include(if: $countryLeagueB) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }  
                    
    events(where: { category: $category, league_contains: $league, startTime_gt: $minTime}, orderBy: startTime) @include(if: $categoryLeagueB) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }  
                    
    events(where: { country: $country, category: $category, league_contains: $league, startTime_gt: $minTime}, orderBy: startTime) @include(if: $countryCategoryLeagueB) {
      id
      description
      startTime
      league
      category
      country
      bets {
        id
      }
    }  
}
`;

export const GET_BETS = gql`
    query getBets($country: Int,
                           $category: Int,
                           $league: String,
                           $state: Int,
                           $account: String!,
                           $noParams: Boolean!,
                           $countryB: Boolean!,
                           $categoryB: Boolean!,
                           $leagueB: Boolean!,
                           $countryCategoryB: Boolean!,
                           $countryLeagueB: Boolean!,
                           $categoryLeagueB: Boolean!,
                           $countryCategoryLeagueB: Boolean!,
                           $eventID: ID!,
                           $eventIDGiven: Boolean!) {

      bets(where: { event: $eventID, creatorBacker_contains: $account }, orderBy: stakingDeadline) @include(if: $eventIDGiven) {
        id
        description
        creatorBetDescription
        creator
        creatorStake
        stakingDeadline
        votingDeadline
        backer
        backerStake
        timeCreated
        outcome
        state
        league
        category
        country
        creatorHasVoted
        backerHasVoted
        creatorProvidedEvidence
        backerProvidedEvidence
        disputeID
      }

      bets(where: {state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $noParams) {
        id
        description
        creatorBetDescription
        creator
        creatorStake
        stakingDeadline
        votingDeadline
        backer
        backerStake
        timeCreated
        outcome
        state
        league
        category
        country
        creatorHasVoted
        backerHasVoted
        creatorProvidedEvidence
        backerProvidedEvidence
        disputeID
      }

                          
    bets(where: {country: $country, state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $countryB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
      votingDeadline
      backer
      backerStake
      timeCreated
      outcome
      state
      league
      category
      country
      creatorHasVoted
      backerHasVoted
      creatorProvidedEvidence
      backerProvidedEvidence
      disputeID
    }
    
    bets(where: {category: $category, state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $categoryB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
      votingDeadline
      backer
      backerStake
      timeCreated
      outcome
      state
      league
      category
      country
      creatorHasVoted
      backerHasVoted
      creatorProvidedEvidence
      backerProvidedEvidence
      disputeID
    }
                    
                        
    bets(where: {league_contains: $league, state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $leagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
      votingDeadline
      backer
      backerStake
      timeCreated
      outcome
      state
      league
      category
      country
      creatorHasVoted
      backerHasVoted
      creatorProvidedEvidence
      backerProvidedEvidence
      disputeID
    }
                    
    bets(where: { country: $country, category: $category, state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $countryCategoryB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
      votingDeadline
      backer
      backerStake
      timeCreated
      outcome
      state
      league
      category
      country
      creatorHasVoted
      backerHasVoted
      creatorProvidedEvidence
      backerProvidedEvidence
      disputeID
    }  
  
    bets(where: { country: $country, league_contains: $league, state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $countryLeagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
      votingDeadline
      backer
      backerStake
      timeCreated
      outcome
      state
      league
      category
      country
      creatorHasVoted
      backerHasVoted
      creatorProvidedEvidence
      backerProvidedEvidence
      disputeID
    }  
                    
    bets(where: { category: $category, league_contains: $league, state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $categoryLeagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
      votingDeadline
      backer
      backerStake
      timeCreated
      outcome
      state
      league
      category
      country
      creatorHasVoted
      backerHasVoted
      creatorProvidedEvidence
      backerProvidedEvidence
      disputeID
    }  
                    
    bets(where: { country: $country, category: $category, league_contains: $league, state: $state, creatorBacker_contains: $account}, orderBy: stakingDeadline) @include(if: $countryCategoryLeagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
      votingDeadline
      backer
      backerStake
      timeCreated
      outcome
      state
      league
      category
      country
      creatorHasVoted
      backerHasVoted
      creatorProvidedEvidence
      backerProvidedEvidence
      disputeID
    }  
    }`;