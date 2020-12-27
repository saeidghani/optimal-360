import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const _Select = ({ elements, className, onChange, size }) => {
  return (
    <div className="w-full">
      <Select
        className={`c-select text-12px ${className}`}
        mode="tags"
        style={{ width: '100%' }}
        onChange={onChange}
        tokenSeparators={[',']}
        size={size}
      >
        {elements.map((elm) => (
          <Option key={elm}>{elm}</Option>
        ))}
      </Select>
    </div>
  );
};

_Select.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
};

_Select.defaultProps = {
  elements: [],
  className: '',
  onChange: () => {},
  size: 'large',
};

export default _Select;
