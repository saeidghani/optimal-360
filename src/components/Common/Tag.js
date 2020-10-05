import React from 'react';
import PropTypes from 'prop-types';

import { Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

// eslint-disable-next-line no-unused-vars
const _Tag = ({ children, text, className, textClassName, color, closable, onClose }) => {
  // eslint-disable-next-line operator-linebreak
  const customClassName =
    color === 'gray'
      ? 'bg-antgray-400 text-antgray-200 border border border-antgray-300'
      : !color && 'bg-antteal bg-opacity-10 border-antteal text-antteal';

  return (
    <Tag
      closeIcon={<CloseCircleOutlined className="text-base ml-2 text-antgray-200" />}
      closable={closable}
      onClose={() => onClose(text)}
      color={color !== 'gray' && color}
      className={`border flex flex-row capitalize px-4 py-2
      justify-around items-center ${className} ${customClassName}`}
    >
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
  closable: PropTypes.bool,
  onClose: PropTypes.func,
};

_Tag.defaultProps = {
  text: '',
  children: '',
  className: '',
  textClassName: '',
  color: '',
  closable: false,
  onClose: () => {},
};

export default _Tag;
