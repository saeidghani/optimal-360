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
  allowClear,
}) => (
  <div className={`${wrapperClassName}`}>
    {label ? <p className="text-heading2 text-sm font-normal mb-4">{label}</p> : null}

    <DatePicker
      allowClear={allowClear}
      value={value ? moment(value) : ''}
      className={`w-full text-body c-datepicker ${className}`}
      onChange={onChange}
      format="DD/MM/YYYY"
      placeholder={placeholder}
      size={size}
    />

    <p className="text-red-500 h-5">{errorMessage}</p>
  </div>
);

_DatePicker.propTypes = {
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  allowClear: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

_DatePicker.defaultProps = {
  className: '',
  wrapperClassName: '',
  label: '',
  errorMessage: '',
  placeholder: 'Select Date',
  size: 'middle',
  value: '',
  allowClear: true,
};

export default _DatePicker;
