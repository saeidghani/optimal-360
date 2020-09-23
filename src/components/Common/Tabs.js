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
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
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
