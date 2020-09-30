import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import moment from 'moment';

const _DatePicker = ({ className, placeholder, size, onChange }) => {
  const dateFormat = 'DD/MM/YYYY';

  return (
    <DatePicker
      className={` ${className}`}
      onChange={(val) => onChange(moment(val).toISOString())}
      format={dateFormat}
      placeholder={placeholder}
      size={size}
    />
  );
};

_DatePicker.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

_DatePicker.defaultProps = {
  className: '',
  placeholder: 'select date',
  size: 'middle',
};

export default _DatePicker;
