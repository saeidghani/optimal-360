/* eslint-disable no-undef */
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
  textClassName,
  textSize,
  disabled,
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
      backgroundColor: '#F5F5F5',
      color: '#B8B8B8',
      borderColor: '#D9D9D9',
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
      disabled={disabled}
      className={`flex justify-center items-center py-3 ${className}`}
      onClick={href ? () => {} : onClick}
      href={href}
      size={size}
      type={type}
      ghost={ghost}
      loading={loading}
      style={styles}
      shape={shape}
    >
      {iconPosition === 'left' && RICON ? <RICON className="inline-flex" /> : null}
      {text ? (
        <p className={`font-normal text-${textSize} leading-6 ${textClassName}`}>{text}</p>
      ) : (
        children || null
      )}
      {iconPosition !== 'left' && RICON ? <RICON className="inline-flex" /> : null}
    </Button>
  );
};

_Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.oneOf(['large', 'middle', 'small']),
  href: PropTypes.string,
  onClick: (props, propName) => {
    if (props.href && (!props[propName] || typeof props[propName] !== 'function')) {
      return new Error('Please provide an onClick function!');
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
  textClassName: PropTypes.string,
  textSize: PropTypes.string,
  disabled: PropTypes.bool,
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
  textClassName: '',
  textSize: 'lg',
  text: '',
  children: '',
  href: undefined,
  disabled: false,
  // eslint-disable-next-line no-alert
  onClick: () => alert('comig soon'),
};

export default _Button;
