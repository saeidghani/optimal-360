import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const _DatePicker = ({
  className,
  wrapperClassName,
  placeholder,
  size,
  value,
  onChange,
  label,
  errorMessage,
}) => (
  <div className={`w-full ${wrapperClassName}`}>
    {label ? <p className="text-sm font-normal mb-2">{label}</p> : null}

    <DatePicker
      // value={value}
      value={value ? moment(value) : ''}
      className={` ${className}`}
      onChange={onChange}
      format="DD/MM/YYYY"
      placeholder={placeholder}
      size={size}
    />

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  </div>
);

_DatePicker.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

_DatePicker.defaultProps = {
  className: '',
  wrapperClassName: '',
  label: '',
  errorMessage: '',
  placeholder: 'select date',
  size: 'middle',
  value: '',
};

export default _DatePicker;
