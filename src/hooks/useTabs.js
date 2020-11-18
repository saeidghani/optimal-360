import { useQuery } from './useQuery';

const useTabs = (tabParam = 'tab', tabArray) => {
  const [parsedQuery, , setQuery] = useQuery();
  const allTabs = tabArray;
  const currentTab = parsedQuery?.[tabParam]?.toString() || allTabs[0];

  const setTab = (tab) => {
    if (allTabs.includes(tab)) {
      setQuery({ [tabParam]: tab, page_size: '10', sort: '', page_number: '1', q: '' });
    } else {
      setQuery({ [tabParam]: allTabs[0], page_size: '10', sort: '', page_number: '1', q: '' });
    }
  };

  return [currentTab, setTab, tabParam];
};

// eslint-disable-next-line import/prefer-default-export
export { useTabs };
