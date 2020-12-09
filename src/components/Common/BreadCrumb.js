import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';

const _BreadCrumb = ({ content, className }) => (
  <Breadcrumb separator="\" className={`capitalize ${className}`}>
    {content.map((el, i) => (
      <Breadcrumb.Item key={i}>{el}</Breadcrumb.Item>
    ))}
  </Breadcrumb>
);

_BreadCrumb.propTypes = {
  className: PropTypes.string,
  content: PropTypes.arrayOf(PropTypes.string),
};

_BreadCrumb.defaultProps = {
  content: [],
  className: '',
};

export default _BreadCrumb;
