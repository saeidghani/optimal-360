import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { TextArea } = Input;

const _TextArea = ({
  name,
  value,
  onChange,
  onPressEnter,
  disabled,
  bordered,
  rows,
  wrapperClassName,
  className,
  label,
  placeholder,
  labelClassName,
  errorMessage,
}) => (
  <div className={`flex flex-col ${wrapperClassName}`}>
    <label className={`text-body mb-3 ${labelClassName}`} htmlFor={name}>
      {label}
    </label>

    <TextArea
      placeholder={placeholder}
      disabled={disabled}
      bordered={bordered}
      value={value}
      onChange={onChange}
      onPressEnter={onPressEnter}
      className={`resize-none hover:bg-antgray-700 bg-antgray-700 p-5 ${className}`}
      rows={rows}
    />

    <p className="text-red-500 h-5 mt-1">{errorMessage}</p>
  </div>
);

_TextArea.propTypes = {
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func,
  disabled: PropTypes.bool,
  bordered: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  labelClassName: PropTypes.string,
  errorMessage: PropTypes.string,
};

_TextArea.defaultProps = {
  name: '',
  placeholder: '',
  rows: 4,
  className: '',
  wrapperClassName: '',
  value: '',
  onPressEnter: () => {},
  disabled: false,
  bordered: false,
  label: '',
  labelClassName: '',
  errorMessage: '',
};

export default _TextArea;
