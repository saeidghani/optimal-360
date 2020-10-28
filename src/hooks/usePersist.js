import React from 'react';
import { useQuery } from './useQuery';

const usePersist = () => {
  const [parsedQuery] = useQuery();
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
    }
  };

  // React.useEffect(() => {
  //   const _clustersStringified = localStorage.getItem('clusters');

  //   if (clustersStringified !== _clustersStringified) {
  //     const storageData = JSON.parse(_clustersStringified);

  //     setPersistData(storageData);
  //   }

  //   // eslint-disable-next-line
  // }, [clustersStringified, clusters.lastChange]);

  return [persistedData, setPersistData];
};

// eslint-disable-next-line import/prefer-default-export
export { usePersist };
