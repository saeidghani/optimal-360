import React, { useEffect } from 'react';
import { useQuery } from './useQuery';

const useTabs = (tabArray) => {
  const [parsedQuery, , setQuery] = useQuery();
  const allTabs = tabArray;
  const currentTab = parsedQuery?.tab?.toString() || allTabs[0];

  const setTab = (tab) => {
    if (allTabs.includes(tab)) {
      setQuery({ tab, page_size: '10', sort: '', page_number: '1' });
    } else {
      setQuery({ tab: allTabs[0], page_size: '10', sort: '', page_number: '1' });
    }
  };
  useEffect(() => {
    const tabFromQuery = parsedQuery?.tab?.toString() || '';
    // eslint-disable-next-line no-unused-expressions
    !allTabs.includes(tabFromQuery) && setQuery({ tab: allTabs[0] });
  }, [parsedQuery?.tab]);

  return [currentTab, setTab];
};

// eslint-disable-next-line import/prefer-default-export
export { useTabs };
