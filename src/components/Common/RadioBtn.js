import React from 'react';
import { Radio } from 'antd';
import PropTypes from 'prop-types';

const RadioBtn = ({ className, defaultValue }) => (
  <Radio.Group className={` ${className}`} name="radiogroup" defaultValue={defaultValue}>
    <Radio value={1}>Active</Radio>
    <Radio value={1}>In-Active</Radio>
  </Radio.Group>
);

RadioBtn.propTypes = {
  defaultValue: PropTypes.string,
  className: PropTypes.string,
};

RadioBtn.defaultProps = {
  defaultValue: '',
  className: '',
};

export default RadioBtn;
