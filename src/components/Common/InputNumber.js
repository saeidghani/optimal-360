import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';

const _InputNumber = ({
  wrapperClassName,
  className,
  onChange,
  size,
  value,
  formatter,
  parser,
  label,
  name,
  min,
  max,
  errorMessage,
  fixedHeightForErrorMessage,
  disabled,
}) => (
  <div className={`w-full ${wrapperClassName}`}>
    {label ? <p className="text-heading2 text-sm font-normal mb-4">{label}</p> : null}

    <InputNumber
      disabled={disabled}
      precision={2}
      step={0.01}
      name={name}
      className={`text-xs text-body ${className}`}
      value={(value || 0).toString()}
      min={min}
      max={max}
      formatter={formatter}
      parser={parser}
      onChange={onChange}
      size={size}
    />

    <p className={`text-red-500 ${fixedHeightForErrorMessage && 'h-5'}`}>{errorMessage}</p>
  </div>
);

_InputNumber.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  value: PropTypes.number,
  label: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  formatter: PropTypes.func,
  parser: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  disabled: PropTypes.bool,
  fixedHeightForErrorMessage: PropTypes.bool,
};

_InputNumber.defaultProps = {
  wrapperClassName: '',
  className: '',
  errorMessage: '',
  size: 'large',
  value: 0,
  label: '',
  name: '',
  min: 0,
  max: 100,
  formatter: (value) => `${value}%`,
  parser: (value) => value.replace('%', ''),
  disabled: false,
  fixedHeightForErrorMessage: true,
};

export default _InputNumber;
