/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const _Dropdown = ({
  handleChange,
  value,
  className,
  placeholder,
  showSearch,
  size,
  type,
  defaultValue,
  options,
}) => (
  // <div>
  <Select
    showSearch={showSearch}
    className={`c-arrow-color text-12px ${className} ${type}-dropdown`}
    onChange={handleChange}
    placeholder={placeholder}
    size={size}
    value={value}
    defaultValue={defaultValue}
    style={{ width: '100%' }}
  >
    {options?.length > 0
      ? options.map((el, i) => (
          <Option key={i} value={el.value}>
            {el.title}
          </Option>
        ))
      : null}
  </Select>
  // </div>
);

_Dropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  showSearch: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
};

_Dropdown.defaultProps = {
  className: '',
  placeholder: '',
  showSearch: true,
  size: 'large',
  type: '',
  defaultValue: '',
  value: '',
};

export default _Dropdown;
