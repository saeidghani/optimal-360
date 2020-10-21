import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';

const { SubMenu } = Menu;
const _Menu = ({ className, title, titleClassName }) => {
  const handleClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={handleClick}
      style={{ width: 202 }}
      className={`bg-antgray-600 ${className}`}
      defaultSelectedKeys={[]}
      defaultOpenKeys={[]}
      mode="inline"
    >
      {title && <h4 className={titleClassName}>{title}</h4>}
      <SubMenu key="cluster1" title={<span>Cluster 1</span>}>
        <SubMenu key="com1" className="inner-sub-menu" title={<span>Competency 1</span>}>
          <Menu.Item key="q9">- Question 1</Menu.Item>
          <Menu.Item key="q10">- Question 2</Menu.Item>
          <Menu.Item key="q11">- Question 3</Menu.Item>
          <Menu.Item key="q12">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com2" className="inner-sub-menu" title={<span>Competency 2</span>}>
          <Menu.Item key="q32">- Question 1</Menu.Item>
          <Menu.Item key="q33">- Question 2</Menu.Item>
          <Menu.Item key="q34">- Question 3</Menu.Item>
          <Menu.Item key="q35">- Question 4</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="cluster2" title={<span>Cluster 2</span>}>
        <SubMenu key="com2" className="inner-sub-menu" title={<span>Competency</span>}>
          <Menu.Item key="q1">- Question 1</Menu.Item>
          <Menu.Item key="q2">- Question 2</Menu.Item>
          <Menu.Item key="q3">- Question 3</Menu.Item>
          <Menu.Item key="q4">- Question 4</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="cluster3" title={<span>Cluster 3</span>}>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 1</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 2</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com123" className="inner-sub-menu" title={<span>Competency 3</span>}>
          <Menu.Item key="q45">- Question 1</Menu.Item>
          <Menu.Item key="q46">- Question 2</Menu.Item>
          <Menu.Item key="q47">- Question 3</Menu.Item>
          <Menu.Item key="q48">- Question 4</Menu.Item>
          <Menu.Item key="q48">- Question 5</Menu.Item>
          <Menu.Item key="q58">- Question 6</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="cluster3" title={<span>Cluster 4</span>}>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 1</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 2</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com123" className="inner-sub-menu" title={<span>Competency 3</span>}>
          <Menu.Item key="q45">- Question 1</Menu.Item>
          <Menu.Item key="q46">- Question 2</Menu.Item>
          <Menu.Item key="q47">- Question 3</Menu.Item>
          <Menu.Item key="q48">- Question 4</Menu.Item>
          <Menu.Item key="q48">- Question 5</Menu.Item>
          <Menu.Item key="q58">- Question 6</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="cluster3" title={<span>Cluster 5</span>}>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 1</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 2</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com123" className="inner-sub-menu" title={<span>Competency 3</span>}>
          <Menu.Item key="q45">- Question 1</Menu.Item>
          <Menu.Item key="q46">- Question 2</Menu.Item>
          <Menu.Item key="q47">- Question 3</Menu.Item>
          <Menu.Item key="q48">- Question 4</Menu.Item>
          <Menu.Item key="q48">- Question 5</Menu.Item>
          <Menu.Item key="q58">- Question 6</Menu.Item>
        </SubMenu>
      </SubMenu>
      <SubMenu key="cluster3" title={<span>Cluster 6</span>}>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 1</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com3" className="inner-sub-menu" title={<span>Competency 2</span>}>
          <Menu.Item key="q5">- Question 1</Menu.Item>
          <Menu.Item key="q6">- Question 2</Menu.Item>
          <Menu.Item key="q7">- Question 3</Menu.Item>
          <Menu.Item key="q8">- Question 4</Menu.Item>
        </SubMenu>
        <SubMenu key="com123" className="inner-sub-menu" title={<span>Competency 3</span>}>
          <Menu.Item key="q45">- Question 1</Menu.Item>
          <Menu.Item key="q46">- Question 2</Menu.Item>
          <Menu.Item key="q47">- Question 3</Menu.Item>
          <Menu.Item key="q48">- Question 4</Menu.Item>
          <Menu.Item key="q48">- Question 5</Menu.Item>
          <Menu.Item key="q58">- Question 6</Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
  );
};

_Menu.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  titleClassName: PropTypes.string,
};

_Menu.defaultProps = { className: '' };

export default _Menu;
