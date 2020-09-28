import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Space } from 'antd';

const _DatePicker = ({ className, placeholder, size, labelname }) => {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  const dateFormat = 'DD/MM/YYYY';

  return (
    <Space direction="vertical">
      <label htmlFor={labelname}>{labelname}</label>
      <DatePicker
        id={labelname}
        className={` ${className}`}
        onChange={onChange}
        format={dateFormat}
        placeholder={placeholder}
        size={size}
      />
    </Space>
  );
};

_DatePicker.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  labelname: PropTypes.string,
};

_DatePicker.defaultProps = {
  className: '',
  placeholder: 'select date',
  size: 'large',
  labelname: 'Date',
};

export default _DatePicker;
