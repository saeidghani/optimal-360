import { useQuery } from './useQuery';

const useTabs = (tabKeyParam = 'tab', tabArray) => {
  const [parsedQuery, , setQuery] = useQuery();
  const allTabs = tabArray;
  const currentTab = parsedQuery?.[tabKeyParam]?.toString() || allTabs[0];

  const setTab = (tab) => {
    if (allTabs.includes(tab)) {
      setQuery({ [tabKeyParam]: tab, page_size: '10', sort: '', page_number: '1', q: '' });
    } else {
      setQuery({ [tabKeyParam]: allTabs[0], page_size: '10', sort: '', page_number: '1', q: '' });
    }
  };

  return [currentTab, setTab, tabKeyParam];
};

// eslint-disable-next-line import/prefer-default-export
export { useTabs };
