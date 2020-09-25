import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'antd';

const _Tag = ({ children, text, className, textClassName, color, borderColor }) => (
  <Tag
    style={{
      borderColor,
    }}
    color={color}
    className={`border ${className}`}
  >
    {text ? <p className={`text-antteal text-xs leading-5 ${textClassName}`}>{text}</p> : children}
  </Tag>
);

_Tag.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
};

_Tag.defaultProps = {
  text: '',
  children: '',
  className: '',
  textClassName: '',
  color: 'rgba(0, 214, 162, 0.1)',
  borderColor: 'rgba(0, 214, 162, 0.5)',
};

export default _Tag;
