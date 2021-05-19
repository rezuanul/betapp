// Resolves the booleans of the filters to the correct state,
// and changes the variables to not null so that the query succeeds.

export default function resolveFilterVariablesForQuery(filters) {
  
  let timeStampNow = parseInt((new Date().getTime() / 1000).toFixed(0)) - 86400;

  if (filters.eventID && filters.eventID !== '') {
    return {
      country: 0,
      category: 0,
      league: '',
      state: parseInt(filters.state),
      minTime: timeStampNow,
      account: filters.account,
      noParams: false,
      countryB: false,
      categoryB: false,
      leagueB: false,
      countryCategoryB: false,
      countryLeagueB: false,
      categoryLeagueB: false,
      countryCategoryLeagueB: false,
      eventID: filters.eventID,
      eventIDGiven: true
    }
  }

  let queryVariables = {
    noParams: (filters.category === ''
      && filters.country === ''
      && filters.league === ''),
    categoryB: filters.category !== '',
    countryB: (filters.country !== ''),
    leagueB: filters.league !== '',
    countryCategoryB: (filters.country !== '' && filters.category !== ''),
    countryLeagueB: (filters.country !== '' && filters.league !== ''),
    categoryLeagueB: (filters.category !== '' && filters.league !== ''),
    countryCategoryLeagueB: (filters.category !== ''
      && filters.country !== ''
      && filters.league !== '')
  };

  if (queryVariables.countryCategoryLeagueB) {
    return {
      country: parseInt(filters.country),
      category: parseInt(filters.category),
      league: filters.league,
      state: filters.state,
      minTime: timeStampNow,
      account: filters.account,
      noParams: false,
      countryB: false,
      categoryB: false,
      leagueB: false,
      countryCategoryB: false,
      countryLeagueB: false,
      categoryLeagueB: false,
      countryCategoryLeagueB: true,
      eventID: '',
      eventIDGiven: false
    };

  } else {

    if (queryVariables.countryCategoryB) {
      return {
        country: parseInt(filters.country),
        category: parseInt(filters.category),
        league: '',
        state: filters.state,
        minTime: timeStampNow,
        account: filters.account,
        noParams: false,
        countryB: false,
        categoryB: false,
        leagueB: false,
        countryCategoryB: true,
        countryLeagueB: false,
        categoryLeagueB: false,
        countryCategoryLeagueB: false,
        eventID: '',
        eventIDGiven: false
      };
    } else if (queryVariables.countryLeagueB) {
      return {
        country: parseInt(filters.country),
        category: 0,
        league: filters.league,
        state: filters.state,
        minTime: timeStampNow,
        account: filters.account,
        noParams: false,
        countryB: false,
        categoryB: false,
        leagueB: false,
        countryCategoryB: false,
        countryLeagueB: true,
        categoryLeagueB: false,
        countryCategoryLeagueB: false,
        eventID: '',
        eventIDGiven: false
      };
    } else if (queryVariables.categoryLeagueB) {
      return {
        country: 0,
        category: parseInt(filters.category),
        league: filters.league,
        state: filters.state,
        minTime: timeStampNow,
        account: filters.account,
        noParams: false,
        countryB: false,
        categoryB: false,
        leagueB: false,
        countryCategoryB: false,
        countryLeagueB: false,
        categoryLeagueB: true,
        countryCategoryLeagueB: false,
        eventID: '',
        eventIDGiven: false
      };

    } else {
      if (queryVariables.countryB) {
        return {
          country: parseInt(filters.country),
          category: 0,
          league: '',
          state: filters.state,
          minTime: timeStampNow,
          account: filters.account,
          noParams: false,
          countryB: true,
          categoryB: false,
          leagueB: false,
          countryCategoryB: false,
          countryLeagueB: false,
          categoryLeagueB: false,
          countryCategoryLeagueB: false,
          eventID: '',
          eventIDGiven: false
        };
      } else if (queryVariables.categoryB) {
        return {
          category: parseInt(filters.category),
          country: 0,
          league: '',
          state: filters.state,
          minTime: timeStampNow,
          account: filters.account,
          noParams: false,
          countryB: false,
          categoryB: true,
          leagueB: false,
          countryCategoryB: false,
          countryLeagueB: false,
          categoryLeagueB: false,
          countryCategoryLeagueB: false,
          eventID: '',
          eventIDGiven: false
        };
      } else if (queryVariables.leagueB) {
        return {
          category: 0,
          league: filters.league,
          country: 0,
          state: filters.state,
          minTime: timeStampNow,
          account: filters.account,
          noParams: false,
          countryB: false,
          categoryB: false,
          leagueB: true,
          countryCategoryB: false,
          countryLeagueB: false,
          categoryLeagueB: false,
          countryCategoryLeagueB: false,
          eventID: '',
          eventIDGiven: false
        };

      } else {
        return {
          country: 0,
          category: 0,
          league: '',
          state: filters.state,
          minTime: timeStampNow,
          account: filters.account,
          noParams: true,
          countryB: false,
          categoryB: false,
          leagueB: false,
          countryCategoryB: false,
          countryLeagueB: false,
          categoryLeagueB: false,
          countryCategoryLeagueB: false,
          eventID: '',
          eventIDGiven: false
        };

      }
    }
  }
}
