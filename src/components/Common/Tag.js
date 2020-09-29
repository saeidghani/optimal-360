import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'antd';

// eslint-disable-next-line no-unused-vars
const _Tag = ({ children, text, className, textClassName, color }) => {
  const customClassName = !color && 'bg-antteal bg-opacity-10 border-antteal text-antteal';

  return (
    <Tag color={color} className={`border ${className} ${customClassName}`}>
      {text ? (
        <p
          className={`text-xs leading-5 ${textClassName}`}
          // className={`text-antteal text-xs leading-5 ${textClassName}`}
        >
          {text}
        </p>
      ) : (
        children
      )}
    </Tag>
  );
};

_Tag.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  className: PropTypes.string,
  textClassName: PropTypes.string,
  color: PropTypes.string,
};

_Tag.defaultProps = {
  text: '',
  children: '',
  className: '',
  textClassName: '',
  color: '',
};

export default _Tag;
