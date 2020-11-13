import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const _Tabs = ({ className, defaultActiveKey, tabOptions, onTabChange }) => {
  return (
    <Tabs
      tabBarStyle={{ color: '#131621' }}
      className={`w-full ${className}`}
      defaultActiveKey={defaultActiveKey}
      onChange={onTabChange}
    >
      {tabOptions?.length > 0
        ? tabOptions.map((tab) => <TabPane tab={tab.title} key={tab.key} />)
        : null}
    </Tabs>
  );
};

_Tabs.propTypes = {
  defaultActiveKey: PropTypes.number,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
  onTabChange: PropTypes.func.isRequired,
};

_Tabs.defaultProps = {
  defaultActiveKey: 1,
  className: '',
  onTabChange: () => {},
};

export default _Tabs;
