import { gql } from '@apollo/client';


export const EVENTS_QUERY = gql`
    query getEvents($country: Int,
                  $category: Int,
                  $league: String,
                  $noParams: Boolean!,
                  $countryB: Boolean!,
                  $categoryB: Boolean!,
                  $leagueB: Boolean!,
                  $countryCategoryB: Boolean!,
                  $countryLeagueB: Boolean!,
                  $categoryLeagueB: Boolean!,
                  $countryCategoryLeagueB: Boolean!
                   ) {
                    
    events @include(if: $noParams) {
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
                    
    events(where: {country: $country}) @include(if: $countryB) {
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
    
    events(where: {category: $category}) @include(if: $categoryB) {
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
                    
                        
    events(where: {league_contains: $league}) @include(if: $leagueB) {
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
                    
    events(where: { country: $country, category: $category}) @include(if: $countryCategoryB) {
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
  
    events(where: { country: $country, league_contains: $league}) @include(if: $countryLeagueB) {
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
                    
    events(where: { category: $category, league_contains: $league}) @include(if: $categoryLeagueB) {
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
                    
    events(where: { country: $country, category: $category, league_contains: $league}) @include(if: $countryCategoryLeagueB) {
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
    query getBetsFromEvent($country: Int,
                           $category: Int,
                           $league: String,
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

      bets(where: { event: $eventID }) @include(if: $eventIDGiven) {
        id
        description
        creatorBetDescription
        creator
        creatorStake
        stakingDeadline
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

      bets @include(if: $noParams) {
        id
        description
        creatorBetDescription
        creator
        creatorStake
        stakingDeadline
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

                          
    bets(where: {country: $country}) @include(if: $countryB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
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
    
    bets(where: {category: $category}) @include(if: $categoryB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
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
                    
                        
    bets(where: {league_contains: $league}) @include(if: $leagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
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
                    
    bets(where: { country: $country, category: $category}) @include(if: $countryCategoryB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
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
  
    bets(where: { country: $country, league_contains: $league}) @include(if: $countryLeagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
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
                    
    bets(where: { category: $category, league_contains: $league}) @include(if: $categoryLeagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
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
                    
    bets(where: { country: $country, category: $category, league_contains: $league}) @include(if: $countryCategoryLeagueB) {
      id
      description
      creatorBetDescription
      creator
      creatorStake
      stakingDeadline
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