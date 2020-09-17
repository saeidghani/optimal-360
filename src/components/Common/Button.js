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
  // use gray as a 'type' variant for button
  gray, // remove this

  icon, // should be string

  iconPosition, // use the prop 'iconPosition' instead of 'reverse'
  // TIP : do not use vague or ambiguous prop names
  // like 'reverse'
  reverse, // remove this
  // antd buttons recive the prop 'shape'
  // therefore there is no need for 'rouded' prop
  rounded, // remove this
  shape,
}) => {
  const RICON = ICONS[icon];
  if (typeof RICON === 'undefined' && !RICON) {
    console.warn(`icon name (${icon}) is not valid as an antd icon`);
  }

  // if (light)
  //   styler = {
  //     opacity: '65%',
  //   };
  // let styler= = {}; use meaningful names for variables
  let styles = {
    opacity: light ? '65%' : '100%',
  };
  if (gray) {
    styles = {
      ...styles,
      backgroundColor: 'whitesmoke',
      color: '#b8b8b8',
      borderColor: '#b8b8b8',
    };
  }

  return (
    <Button
      // avoid using 'Template literals (Template strings)'
      // as much as possible as they are very messy and hard to maintain
      className="flex justify-center items-center"
      // using iconPosition props will eliminate the need to
      // use css reverse utilities like 'flex-row-reverse'

      // antd buttons recive the prop 'shape'
      // therefore there is no need for 'rouded' prop
      // therefore removing the need
      // to use 'Template literals (Template strings)' altogether

      // className={`flex justify-center items-center ${
      //   reverse ? `flex-row-reverse custom-reverse-icon` : ``
      // } ${rounded ? `c-rounded-button` : ``}`}

      onClick={onClick}
      size={size}
      type={type}
      ghost={ghost}
      loading={loading}
      style={styles}
      shape={shape}
      // icon={icon}
    >
      {iconPosition === 'left' && RICON ? <RICON className="inline-flex" /> : null}
      {children}
      {iconPosition !== 'left' && RICON ? <RICON className="inline-flex" /> : null}
    </Button>
  );
};

// FIX : define every prop in propTypes and assign defult props

_Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  iconPosition: PropTypes.string,
};

_Button.defaultProps = {
  type: 'primary',
  size: 200,
  iconPosition: 'left',
  shape: '',
};

export default _Button;
