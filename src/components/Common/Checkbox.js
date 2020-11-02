import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const _Checkbox = ({ checked, textNode, onChange, className, children, labelClass, disabled }) => (
  <Checkbox
    disabled={disabled}
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className={` ${className}`}
  >
    {/* TODO Fix */}
    {textNode ? (
      textNode
    ) : children ? (
      typeof children === 'string' ? (
        <span className={` ${labelClass}`}>{children}</span>
      ) : (
        children
      )
    ) : null}
  </Checkbox>
);

_Checkbox.propTypes = {
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.string,
  className: PropTypes.string,
  labelClass: PropTypes.string,
  textNode: PropTypes.string,
};

_Checkbox.defaultProps = {
  disabled: false,
  textNode: '',
  children: '',
  className: '',
  labelClass: 'text-antgray-100 text-12px',
};

export default _Checkbox;
