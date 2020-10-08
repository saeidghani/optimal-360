import React from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

const parse = (str, options) =>
  qs.parse(str, { ignoreQueryPrefix: true, comma: 'true', ...options });
const stringify = (obj, options) =>
  qs.stringify(obj, { addQueryPrefix: true, arrayFormat: 'comma', ...options });

const useQuery = () => {
  const history = useHistory();
  const { search, pathname } = history.location;

  // query state initial value must be a valid stringified value from the url
  const [query, _setQuery] = React.useState(stringify(parse(search)));

  React.useEffect(() => {
    const newQuery = parse(search);
    const queryStr = stringify(newQuery);

    _setQuery(queryStr);
  }, [search, pathname]);

  const setQuery = (obj) => {
    if (!obj || typeof obj !== 'object') {
      history.push(pathname);
      return;
    }

    const parsedQuery = parse(search);
    const newObject = { ...parsedQuery, ...obj };
    // we destruct a new obj not to overwrite pervious params

    Object.keys(newObject).forEach((key) => {
      if (!newObject[key]) return delete newObject[key];

      if (newObject[key] && newObject[key].length < 1) return delete newObject[key];
    });
    // if a query parameter has an empty('') value
    // we remove it from the parsed object

    const newQuery = stringify(newObject);

    // if there is no params we empty the query part
    // but we dont't want to transtion back to '/'
    // so we go to 'pathname'
    history.push(newQuery || pathname);
  };

  const parsedQuery = parse(query);

  return [parsedQuery, query, setQuery];
};

export { useQuery, parse, stringify };
