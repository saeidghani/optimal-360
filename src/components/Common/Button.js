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
  className,
  text,
  href,
}) => {
  const RICON = ICONS[icon];
  if (icon && typeof RICON === 'undefined' && !RICON) {
    console.warn(`icon name (${icon}) is not valid as an antd icon`);
  }

  let styles = {
    opacity: light ? '65%' : '100%',
  };
  if (type === 'gray') {
    styles = {
      ...styles,
      backgroundColor: 'whitesmoke',
      color: '#b8b8b8',
      borderColor: '#b8b8b8',
    };
  }
  if (type === 'pagination') {
    styles = {
      ...styles,
      backgroundColor: '#DDF4F9',
      color: '#1BB7D9',
      borderColor: '#DDF4F9',
    };
  }

  return (
    <Button
      className={`flex justify-center items-center ${className}`}
      onClick={onClick}
      href={href}
      size={size}
      type={type}
      ghost={ghost}
      loading={loading}
      style={styles}
      shape={shape}
    >
      {iconPosition === 'left' && RICON ? <RICON className="inline-flex" /> : null}
      {text ? <p className="font-normal text-lg leading-6">{text}</p> : children}
      {iconPosition !== 'left' && RICON ? <RICON className="inline-flex" /> : null}
    </Button>
  );
};

_Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  // onClick: PropTypes.func.isRequired,
  href: PropTypes.string,
  onClick: (props, propName) => {
    if (props.href && (!props[propName] || typeof props[propName] !== 'function')) {
      return new Error('Please provide a onClick function!');
    }
  },
  children: PropTypes.node,
  iconPosition: PropTypes.string,
  shape: PropTypes.string,
  icon: PropTypes.string,
  ghost: PropTypes.bool,
  loading: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string,
};

_Button.defaultProps = {
  type: 'primary',
  size: 'large',
  iconPosition: 'left',
  shape: '',
  icon: null,
  ghost: false,
  loading: false,
  light: false,
  className: '',
  text: '',
  children: '',
  href: undefined,
  onClick: () => {},
};

export default _Button;
