import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const _Input = ({ placeholder, suffix, prefix, gray }) => {
  return (
    <Input
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
      className={gray ? `c-sufix-prefix-gray` : ``}
    />
  );
};

Input.propTypes = {};

Input.defaultProps = {};

export default _Input;
