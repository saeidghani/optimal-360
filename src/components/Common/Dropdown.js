import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;
const _Dropdown = ({
  handleChange,
  className,
  placeholder,
  showSearch,
  size,
  type,
  defaultValue,
}) => (
  <div>
    <Select
      showSearch={showSearch}
      className={`c-arrow-color w-full text-12px ${className} ${type}-dropdown`}
      onChange={handleChange}
      placeholder={placeholder}
      size={size}
      defaultValue={defaultValue}
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
  type: PropTypes.string,
  defaultValue: PropTypes.string,
};

_Dropdown.defaultProps = {
  className: '',
  placeholder: '',
  showSearch: true,
  size: 'large',
  type: '',
  defaultValue: '',
};

export default _Dropdown;
