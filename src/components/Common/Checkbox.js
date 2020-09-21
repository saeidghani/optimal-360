import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const _Checkbox = ({ onChange, className, children }) => (
  <Checkbox onChange={onChange} className={` ${className}`}>
    {children}
  </Checkbox>
);

_Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.string,
  className: PropTypes.string,
};

_Checkbox.defaultProps = {
  children: '',
  className: '',
};

export default _Checkbox;
