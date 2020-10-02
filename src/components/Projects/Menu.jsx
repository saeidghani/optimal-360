import React from 'react';
import { Menu } from 'antd';

const SurveyMenu = () => {
  return (
    <Menu
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      style={{ width: 226, paddingLeft: 11, paddingTop: 30 }}
    >
      <h4 className="pb-6 pl-4 text-body font-medium font-sans">SurveyMenu</h4>
      <Menu.Item key="1">Top Leadership</Menu.Item>
      <Menu.Item key="2">High Potentials</Menu.Item>
    </Menu>
  );
};

export default SurveyMenu;
