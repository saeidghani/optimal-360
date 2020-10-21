import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DatePicker } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

const Calender = ({ className, placeholder, value, onChange, disabled, icon }) => (
  <DatePicker
    disabled={disabled}
    placeholder={placeholder}
    value={value ? moment(value) : ''}
    onChange={onChange}
    className={`c-calendar w-30 h-10 ${className}`}
    suffixIcon={icon && <CalendarOutlined />}
  />
);

Calender.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  icon: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
};

Calender.defaultProps = {
  className: '',
  placeholder: 'Calendar',
  value: '',
  disabled: false,
  icon: false,
};

export default Calender;
