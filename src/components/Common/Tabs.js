import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

const { TabPane } = Tabs;
const _Tabs = ({ className, defaultActiveKey }) => {
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
      <TabPane tab="Status Overview" key="1" />
      <TabPane tab="Status Details" key="2" />
      <TabPane tab="Rater Email" key="3" />
      <TabPane tab="Results" key="4" />
    </Tabs>
  );
};

_Tabs.propTypes = {
  defaultActiveKey: PropTypes.number,
  className: PropTypes.string,
};

_Tabs.defaultProps = {
  defaultActiveKey: 1,
  className: '',
};

export default _Tabs;
