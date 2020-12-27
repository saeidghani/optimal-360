import React from 'react';
import { useQuery } from './useQuery';

const usePersist = () => {
  const [parsedQuery, query] = useQuery();
  const { projectId, surveyGroupId } = parsedQuery;
  const KEY = `${projectId}--${surveyGroupId}`;

  const clustersStringified = localStorage.getItem(`clusters-${KEY}`);

  const clusters = clustersStringified
    ? JSON.parse(clustersStringified)
    : { data: '', lastChange: '' };

  const [persistedData, _setData] = React.useState(clusters);

  const setPersistData = (someData) => {
    if (someData) {
      const newData = { data: someData, lastChange: Date.now() };
      localStorage.setItem(`clusters-${KEY}`, JSON.stringify(newData));

      _setData(newData);
    } else {
      _setData('');
      localStorage.removeItem(`clusters-${KEY}`);
    }
  };

  React.useEffect(() => {
    const _clustersStringified = localStorage.getItem(`clusters-${KEY}`);

    const parsedClusters = JSON.parse(_clustersStringified);
    setPersistData(parsedClusters?.data);

    // eslint-disable-next-line
  }, [query]);

  return [persistedData, setPersistData];
};

// eslint-disable-next-line import/prefer-default-export
export { usePersist };
