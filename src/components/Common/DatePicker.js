import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const _DatePicker = ({ className, placeholder, size, onChange, label, errorMessage }) => (
  <div className="w-full">
    {label ? <p className="text-sm font-normal mb-2">{label}</p> : null}

    <DatePicker
      className={` ${className}`}
      onChange={(val) => onChange(moment(val).toISOString())}
      format="DD/MM/YYYY"
      placeholder={placeholder}
      size={size}
    />

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  </div>
);

_DatePicker.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

_DatePicker.defaultProps = {
  className: '',
  label: '',
  errorMessage: '',
  placeholder: 'select date',
  size: 'middle',
};

export default _DatePicker;
