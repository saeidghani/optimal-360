/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const _Dropdown = (
  {
    loading,
    handleChange,
    value,
    labelInValue,
    className,
    placeholder,
    showSearch,
    size,
    type,
    defaultValue,
    options,
  },
) => (
  // <div>
  <Select
    loading={loading}
    showSearch={showSearch}
    className={`c-arrow-color text-xs ${className} ${type}-dropdown`}
    onChange={handleChange}
    placeholder={placeholder}
    size={size}
    labelInValue={labelInValue}
    value={value || undefined}
    defaultValue={defaultValue || undefined}
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
  loading: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  showSearch: PropTypes.bool,
  size: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  labelInValue: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      title: PropTypes.string,
    }),
  ).isRequired,
};

_Dropdown.defaultProps = {
  loading: false,
  className: '',
  placeholder: '',
  showSearch: true,
  size: 'large',
  type: '',
  defaultValue: '',
  value: '',
  labelInValue: false,
};

export default _Dropdown;
