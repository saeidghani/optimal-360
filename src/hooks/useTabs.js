import React, { useEffect } from 'react';
import { useQuery } from './useQuery';

const useTabs = (tabArray) => {
  const [parsedQuery, , setQuery] = useQuery();
  const allTabs = tabArray;
  const currentTab = parsedQuery?.tab?.toString() || allTabs[0];

  const setTab = (tab) => {
    if (allTabs.includes(tab)) {
      setQuery({ tab, page_size: '10', sort: '', page_number: '1', q: '' });
    } else {
      setQuery({ tab: allTabs[0], page_size: '10', sort: '', page_number: '1', q: '' });
    }
  };

  return [currentTab, setTab];
};

// eslint-disable-next-line import/prefer-default-export
export { useTabs };
