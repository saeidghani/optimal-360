import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const _Checkbox = ({ checked, onChange, className, children, labelClass, disabled }) => {

  const [isChecked, setIsChecked] = useState(checked);

  return (
    <Checkbox
      disabled={disabled}
      checked={isChecked}
      onChange={(e) => { onChange(e.target.checked); setIsChecked(e.target.checked) }}
      className={` ${className}`}
    >
      <span className={` ${labelClass}`}>{children}</span>
    </Checkbox>

  )
};

_Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
};

_Checkbox.defaultProps = {
  disabled: false,
  children: '',
  className: '',
  labelClass: 'text-antgray-100 text-12px',
};

export default _Checkbox;
