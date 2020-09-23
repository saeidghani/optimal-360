import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const _Checkbox = ({ checked, onChange, className, children }) => (
  <Checkbox
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className={` ${className}`}
  >
    {children}
  </Checkbox>
);

_Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.string,
  className: PropTypes.string,
};

_Checkbox.defaultProps = {
  children: '',
  className: '',
};

export default _Checkbox;
