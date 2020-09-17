import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const _Button = ({ type, size, onClick, children, ghost, loading, light, gray, icon }) => {
  let styler = {};
  if (gray) {
    styler = {
      backgroundColor: 'whitesmoke',
      color: '#b8b8b8',
      borderColor: '#b8b8b8',
    };
  }
  if (light)
    styler = {
      opacity: '65%',
    };

  return (
    <Button
      className={'flex justify-center items-center'}
      onClick={onClick}
      size={size}
      type={type}
      ghost={ghost}
      loading={loading}
      style={styler}
      icon={icon}
    >
      {children}
    </Button>
  );
};

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
