// Resolves the booleans of the filters to the correct state,
// and changes the variables to not null so that the query succeeds.

export default function resolveFilterVariablesForQuery(filters) {
  let queryVariables = {
    noParams: (filters.category === ''
      && filters.country === ''
      && filters.league == undefined),
    categoryB: filters.category !== '',
    countryB: (filters.country !== ''),
    leagueB: filters.league != undefined,
    countryCategoryB: (filters.country !== '' && filters.category !== ''),
    countryLeagueB: (filters.country !== '' && filters.league != undefined),
    categoryLeagueB: (filters.category !== '' && filters.league != undefined),
    countryCategoryLeagueB: (filters.category !== ''
      && filters.country !== ''
      && filters.league != undefined)
  };

  if (queryVariables.countryCategoryLeagueB) {
    return {
      country: parseInt(filters.country),
      category: parseInt(filters.category),
      league: filters.league,
      noParams: false,
      countryB: false,
      categoryB: false,
      leagueB: false,
      countryCategoryB: false,
      countryLeagueB: false,
      categoryLeagueB: false,
      countryCategoryLeagueB: true
    };

  } else {

    if (queryVariables.countryCategoryB) {
      return {
        country: parseInt(filters.country),
        category: parseInt(filters.category),
        league: '',
        noParams: false,
        countryB: false,
        categoryB: false,
        leagueB: false,
        countryCategoryB: true,
        countryLeagueB: false,
        categoryLeagueB: false,
        countryCategoryLeagueB: false
      };
    } else if (queryVariables.countryLeagueB) {
      return {
        country: parseInt(filters.country),
        category: 0,
        league: filters.league,
        noParams: false,
        countryB: false,
        categoryB: false,
        leagueB: false,
        countryCategoryB: false,
        countryLeagueB: true,
        categoryLeagueB: false,
        countryCategoryLeagueB: false
      };
    } else if (queryVariables.categoryLeagueB) {
      return {
        country: 0,
        category: parseInt(filters.category),
        league: filters.league,
        noParams: false,
        countryB: false,
        categoryB: false,
        leagueB: false,
        countryCategoryB: false,
        countryLeagueB: false,
        categoryLeagueB: true,
        countryCategoryLeagueB: false
      };

    } else {
      if (queryVariables.countryB) {
        return {
            country: parseInt(filters.country),
            category: 0,
            league: '',
            noParams: false,
            countryB: true,
            categoryB: false,
            leagueB: false,
            countryCategoryB: false,
            countryLeagueB: false,
            categoryLeagueB: false,
            countryCategoryLeagueB: false
        };
      } else if (queryVariables.categoryB) {
        return {
          category: parseInt(filters.category),
          country: 0,
          league: '',
          noParams: false,
          countryB: false,
          categoryB: true,
          leagueB: false,
          countryCategoryB: false,
          countryLeagueB: false,
          categoryLeagueB: false,
          countryCategoryLeagueB: false
        };
      } else if (queryVariables.leagueB) {
        return {
          category: 0,
          league: filters.league,
          country: 0,
          noParams: false,
          countryB: false,
          categoryB: false,
          leagueB: true,
          countryCategoryB: false,
          countryLeagueB: false,
          categoryLeagueB: false,
          countryCategoryLeagueB: false
        };

      } else {
        return {
          country: 0,
          category: 0,
          league: '',
          noParams: true,
          countryB: false,
          categoryB: false,
          leagueB: false,
          countryCategoryB: false,
          countryLeagueB: false,
          categoryLeagueB: false,
          countryCategoryLeagueB: false
        };

      }
    }
  }
}