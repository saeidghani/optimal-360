import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Tabs from '../../Common/Tabs';

const SecondaryTabs = ({ defaultActiveKey }) => {
  const history = useHistory();

  const tabs = [
    { title: 'Individual', key: 'individual' },
    { title: 'Group', key: 'ratee-group' },
    { title: 'All', key: 'all-ratees' },
  ];

  const onTabChange = (key) => {
    console.log(key);
    history.push(`/survey-platform/managers/${key}`);
  };

  return (
    <div className="md:w-1/2">
      <Tabs
        className="md:c-tabs-class"
        defaultActiveKey={defaultActiveKey}
        tabOptions={tabs}
        onTabChange={onTabChange}
      />
    </div>
  );
};

SecondaryTabs.propTypes = {
  defaultActiveKey: PropTypes.string,
};

SecondaryTabs.defaultProps = {
  defaultActiveKey: '1',
};

export default SecondaryTabs;
