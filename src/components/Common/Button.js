import React from 'react';
import PropTypes from 'prop-types';
import * as ICONS from '@ant-design/icons';
import { Button } from 'antd';

const _Button = ({
  type,
  size,
  onClick,
  children,
  ghost,
  loading,
  light,
  icon,
  iconPosition,
  shape,
}) => {
  const RICON = ICONS[icon];
  if (typeof RICON === 'undefined' && !RICON) {
    console.warn(`icon name (${icon}) is not valid as an antd icon`);
  }

  let styles = {
    opacity: light ? '65%' : '100%',
  };
  if (type == 'gray') {
    styles = {
      ...styles,
      backgroundColor: 'whitesmoke',
      color: '#b8b8b8',
      borderColor: '#b8b8b8',
    };
  }

  return (
    <Button
      className="flex justify-center items-center"
      onClick={onClick}
      size={size}
      type={type}
      ghost={ghost}
      loading={loading}
      style={styles}
      shape={shape}
    >
      {iconPosition === 'left' && RICON ? <RICON className="inline-flex" /> : null}
      {children}
      {iconPosition !== 'left' && RICON ? <RICON className="inline-flex" /> : null}
    </Button>
  );
};

_Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  iconPosition: PropTypes.string,
  shape: PropTypes.string,
  icon: PropTypes.string,
  ghost: PropTypes.bool,
  loading: PropTypes.bool,
  light: PropTypes.bool,
};

_Button.defaultProps = {
  type: 'primary',
  size: 200,
  iconPosition: 'left',
  shape: '',
  icon: null,
  ghost: false,
  loading: false,
  light: false,
};

export default _Button;
