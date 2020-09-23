import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;
const _Dropdown = ({ handleChange, className, placeholder, showSearch, size }) => (
  <div>
    <Select
      showSearch={showSearch}
      className={`c-arrow-color w-full  ${className}`}
      onChange={handleChange}
      placeholder={placeholder}
      size={size}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="tom">Tom</Option>
    </Select>
  </div>
);

_Dropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  showSearch: PropTypes.bool,
  size: PropTypes.string,
};

_Dropdown.defaultProps = {
  className: '',
  placeholder: '',
  showSearch: true,
  size: 'large',
};

export default _Dropdown;
