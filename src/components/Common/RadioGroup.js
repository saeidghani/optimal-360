import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const RadioGroup = ({ className, defaultValue, items, value, onChange }) => (
  <Radio.Group
    className={` ${className}`}
    name="radiogroup"
    value={value}
    onChange={onChange}
    defaultValue={defaultValue}
  >
    {items?.length > 0
      ? items.map(({ value, title }) => (
          // eslint-disable-next-line react/jsx-indent
          <Radio key={title} value={value}>
            {title}
          </Radio>
        ))
      : null}
  </Radio.Group>
);

RadioGroup.propTypes = {
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  defaultValue: '',
  className: '',
};

export default RadioGroup;
