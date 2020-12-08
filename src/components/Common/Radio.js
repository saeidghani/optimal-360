import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const _Radio = ({ className, defaultValue, title, value, checked, onChange }) => (
  <Radio
    className={className}
    value={value}
    checked={checked}
    onChange={onChange}
    defaultValue={defaultValue}
  >
    {title}
  </Radio>
);

_Radio.propTypes = {
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

_Radio.defaultProps = {
  defaultValue: '',
  className: '',
  title: '',
  checked: false,
  value: '',
};

export default _Radio;
