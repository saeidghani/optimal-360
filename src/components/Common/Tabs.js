import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const _Tabs = ({ className, defaultActiveKey, tabOptions }) => {
  function callback(key) {
    console.log(key);
  }

  return (
    <Tabs
      tabBarStyle={{ color: '#131621' }}
      className={`w-full ${className}`}
      defaultActiveKey={defaultActiveKey}
      onChange={callback}
    >
      {tabOptions?.map((tab) => (
        <TabPane tab={tab.title} key={tab.key} />
      ))}
    </Tabs>
  );
};

_Tabs.propTypes = {
  defaultActiveKey: PropTypes.number,
  tabOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
  className: PropTypes.string,
};

_Tabs.defaultProps = {
  defaultActiveKey: 1,
  className: '',
};

export default _Tabs;
