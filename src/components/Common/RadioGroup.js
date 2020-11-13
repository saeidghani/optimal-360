import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const RadioGroup = ({ className, radioClassName, defaultValue, items, value, onChange }) => (
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
          <Radio color="red" key={title} value={value} className={radioClassName}>
            {title}
          </Radio>
        ))
      : null}
  </Radio.Group>
);

RadioGroup.propTypes = {
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  radioClassName: PropTypes.string,
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
  radioClassName: '',
};

export default RadioGroup;
