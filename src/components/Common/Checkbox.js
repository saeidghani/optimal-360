import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

const _Checkbox = ({ size, onChange }) => {
  // return <div className="text-red-500 mt-2">negar</div>;
  return <Checkbox size={size} onChange={onChange}></Checkbox>;
};

_Checkbox.propTypes = {
  size: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

_Checkbox.defaultProps = {
  size: 16,
};

export default _Checkbox;
