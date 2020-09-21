import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const RadioBtn = ({ children, className }) => <Radio className={` ${className}`}>{children}</Radio>;

RadioBtn.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

RadioBtn.defaultProps = {
  children: '',
  className: '',
};

export default RadioBtn;
