import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const _Button = ({ type, size, onClick, children }) => (
  <Button onClick={onClick} size={size} type={type}>
    {children}
  </Button>
);

_Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

_Button.defaultProps = {
  type: 'primary',
  size: 200,
};

export default _Button;
