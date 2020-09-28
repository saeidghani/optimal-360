import React from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

const parse = (str) => qs.parse(str, { ignoreQueryPrefix: true });
const stringify = (obj) => qs.stringify(obj, { addQueryPrefix: true });

const useQuery = (initialState = '') => {
  const [query, _setQuery] = React.useState(initialState);

  const history = useHistory();
  const { search } = history.location;

  React.useEffect(() => {
    const newQuery = parse(search);
    const queryStr = stringify(newQuery);

    _setQuery(queryStr);
  }, [search]);

  const setQuery = (obj) => {
    const parsedQuery = parse(search);
    const newObject = { ...parsedQuery, ...obj };

    const newQuery = stringify(newObject);
    history.push(newQuery);
  };

  const parsedQuery = parse(query);

  return [parsedQuery, query, setQuery];
};

// eslint-disable-next-line import/prefer-default-export
export { useQuery };
