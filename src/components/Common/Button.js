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
  iconClassName,
  textSize,
  disabled,
  danger,
  htmlType,
}) => {
  const RICON = ICONS[icon];
  if (icon && typeof icon !== 'object' && typeof RICON === 'undefined' && !RICON) {
    console.warn(`icon name (${icon}) is not valid as an antd icon`);
  }

  let styles = {
    opacity: light ? '50%' : '100%',
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
      className={`flex justify-center items-center ${className}`}
      onClick={href ? () => {} : onClick}
      href={href}
      size={size}
      type={type}
      ghost={ghost}
      loading={loading}
      style={styles}
      shape={shape}
      danger={danger}
      htmlType={htmlType}
    >
      {iconPosition === 'left' ? (
        icon && typeof icon === 'object' ? (
          icon
        ) : RICON ? (
          <RICON className={`${iconClassName} inline-flex`} />
        ) : null
      ) : null}
      {text ? (
        <p className={`font-normal text-${textSize} leading-6 ${textClassName}`}>{text}</p>
      ) : (
        children || null
      )}
      {iconPosition !== 'left' ? (
        icon && typeof icon === 'object' ? (
          icon
        ) : RICON ? (
          <RICON className={`${iconClassName} inline-flex`} />
        ) : null
      ) : null}
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
  icon: PropTypes.node,
  ghost: PropTypes.bool,
  loading: PropTypes.bool,
  light: PropTypes.bool,
  className: PropTypes.string,
  text: PropTypes.string,
  textClassName: PropTypes.string,
  iconClassName: PropTypes.string,
  textSize: PropTypes.string,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  htmlType: PropTypes.string,
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
  iconClassName: '',
  textSize: 'lg',
  text: '',
  children: '',
  href: undefined,
  disabled: false,
  danger: false,
  htmlType: 'button',
  // eslint-disable-next-line no-alert
  onClick: () => alert('Coming soon'),
};

export default _Button;
