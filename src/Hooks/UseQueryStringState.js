import queryString from 'query-string';
import { useMemo } from 'react';

/**
 * Use the query string to store state. This works just like the native useState hook
 * @param {object} router - react router
 * @param {object} defaults - properties and values to use if not in the query string
 * @returns {[object, Function]} the current state and a function to set the state
 * @see https://reactjs.org/docs/hooks-state.html
 */
export default (router, defaults = {}) => {
  const { history, location } = router;
  const queryStringState = useMemo(() => {
    const parsedQuery = queryString.parse(location.search, {
      parseNumbers: true,
      arrayFormat: 'comma',
    });
    return {
      ...defaults,
      ...parsedQuery,
    };
  }, [location.search]);
  const updateQueryStringState = newState => {
    const qs = queryString.stringify(newState, {
      arrayFormat: 'comma',
    });
    history.push({
      pathname: location.pathname,
      search: qs,
    });
  };
  return [queryStringState, updateQueryStringState];
};
