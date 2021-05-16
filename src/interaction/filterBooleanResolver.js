// Resolves the booleans of the filters to the correct state

export default function resolveFilterBooleans(filters, setFilters) {
    let bools = {
        noParams: (filters.category != null
            && filters.country != null
            && filters.league != null),
        categoryB: filters.category != null,
        countryB: filters.country != null,
        leagueB: filters.league != null,
        countryCategoryB: (filters.country && filters.category != null),
        countryLeagueB: (filters.country && filters.league != null),
        categoryLeagueB: (filters.category && filters.league != null),
        countryCategoryLeagueB: (filters.category != null
            && filters.country != null
            && filters.league != null)
    }
    if (bools.countryCategoryLeagueB) {
        setFilters({
            ...filters,
            noParams: false,
            countryB: false,
            categoryB: false,
            leagueB: false,
            countryCategoryB: false,
            countryLeagueB: false,
            categoryLeagueB: false,
            countryCategoryLeagueB: true
          });
        return;
    }
    if (bools.countryCategoryB) {
        setFilters({
            ...filters,
            noParams: false,
            countryB: false,
            categoryB: false,
            leagueB: false,
            countryCategoryB: true,
            countryLeagueB: false,
            categoryLeagueB: false,
            countryCategoryLeagueB: false
          });
        return;
    } else if (bools.countryLeagueB) {
        setFilters({
            ...filters,
            noParams: false,
            countryB: false,
            categoryB: false,
            leagueB: false,
            countryCategoryB: false,
            countryLeagueB: true,
            categoryLeagueB: false,
            countryCategoryLeagueB: false
          });
        return;
    } else if (bools.categoryLeagueB) {
        setFilters({
            ...filters,
            noParams: false,
            countryB: false,
            categoryB: false,
            leagueB: false,
            countryCategoryB: false,
            countryLeagueB: false,
            categoryLeagueB: true,
            countryCategoryLeagueB: false
          });
        return;
    }

    if (bools.countryB) {
        setFilters({
            ...filters,
            noParams: false,
            countryB: true,
            categoryB: false,
            leagueB: false,
            countryCategoryB: false,
            countryLeagueB: false,
            categoryLeagueB: false,
            countryCategoryLeagueB: false
          });
        return;
    } else if (bools.categoryB) {
        setFilters({
            ...filters,
            noParams: false,
            countryB: false,
            categoryB: true,
            leagueB: false,
            countryCategoryB: false,
            countryLeagueB: false,
            categoryLeagueB: false,
            countryCategoryLeagueB: false
          });
        return;
    } else if (bools.leagueB) {
        setFilters({
            ...filters,
            noParams: false,
            countryB: false,
            categoryB: false,
            leagueB: true,
            countryCategoryB: false,
            countryLeagueB: false,
            categoryLeagueB: false,
            countryCategoryLeagueB: false
          });
        return;
    }

    setFilters({
        ...filters,
        noParams: true,
        countryB: false,
        categoryB: false,
        leagueB: false,
        countryCategoryB: false,
        countryLeagueB: false,
        categoryLeagueB: false,
        countryCategoryLeagueB: false
      });
}