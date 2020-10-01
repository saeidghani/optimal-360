import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

const _InputNumber = ({ className, defaultValue, onChange, size }) => (
  <div>
    <InputNumber
      className={`text-12px ${className}`}
      defaultValue={defaultValue}
      min={0}
      max={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value.replace('%', '')}
      onChange={onChange}
      size={size}
    />
  </div>
);

_InputNumber.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  size: PropTypes.string,
};

_InputNumber.defaultProps = {
  className: '',
  defaultValue: 0,
  onChange: () => {
    console.log('chnage number');
  },
  size: 'large',
};

export default _InputNumber;
