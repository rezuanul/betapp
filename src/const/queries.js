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
                  $countryCategoryLeagueB: Boolean!,
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