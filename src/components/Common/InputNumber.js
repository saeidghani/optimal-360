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
}) => (
  <div className={`w-full ${wrapperClassName}`}>
    {label ? <p className="text-sm font-normal mb-2">{label}</p> : null}

    <InputNumber
      name={name}
      className={`text-12px ${className}`}
      value={(value || 0).toString()}
      min={min}
      max={max}
      formatter={formatter}
      parser={parser}
      onChange={onChange}
      size={size}
    />

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
};

export default _InputNumber;
