import React from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

const parse = (str) => qs.parse(str, { ignoreQueryPrefix: true });
const stringify = (obj) => qs.stringify(obj, { addQueryPrefix: true });

const useQuery = (initialState = '') => {
  const [query, _setQuery] = React.useState(initialState);

  const history = useHistory();
  const { search, pathname } = history.location;

  React.useEffect(() => {
    const newQuery = parse(search);
    const queryStr = stringify(newQuery);

    _setQuery(queryStr);
  }, [search]);

  const setQuery = (obj) => {
    const parsedQuery = parse(search);
    const newObject = { ...parsedQuery, ...obj };
    // we destruct a new obj not to overwrite pervious params

    Object.keys(newObject).map((key) => {
      if (!newObject[key]) delete newObject[key];
    });
    // if a query parameter has an empty('') value
    // we remove it from the parsed object

    if (newObject.page_size && !newObject.page_number) {
      newObject.page_number = 1;
    }

    const newQuery = stringify(newObject);

    // if there is no params we empty the query part
    // but we dont't want to transtion back to '/'
    // so we go to 'pathname'
    history.push(newQuery || pathname);
  };

  const parsedQuery = parse(query);

  return [parsedQuery, query, setQuery];
};

// eslint-disable-next-line import/prefer-default-export
export { useQuery };
