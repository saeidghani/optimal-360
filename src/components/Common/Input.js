import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const _Input = ({
  name,
  type,
  labelText,
  placeholder,
  suffix,
  prefix,
  extrainfoLink,
  extrainfoText,
  inputClass,
  value,
  onChange,
  wrapperClassName,
  size,
  disabled,
  errorMessage,
  inputStyles,
}) => (
  <div name={name} className={`flex flex-col  ${wrapperClassName}`}>
    {labelText || (extrainfoText && extrainfoLink) ? (
      <div className="flex justify-between items-center mb-10p pl-1">
        {labelText ? (
          <label className="text-heading" htmlFor={name}>
            {labelText}
          </label>
        ) : null}

        {extrainfoText && extrainfoLink ? (
          <div>
            <a className="text-black underline text-antgray-100 text-12px" href={extrainfoLink}>
              {extrainfoText}
            </a>
          </div>
        ) : null}
      </div>
    ) : null}

    <Input
      type={type}
      disabled={disabled}
      onChange={onChange}
      value={value}
      name={name}
      size={size}
      className={`c-sufix-prefix-gray text-12px ${inputClass}`}
      style={inputStyles}
      id={name}
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
    />

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  </div>
);

_Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.node,
  prefix: PropTypes.node,
  extrainfoLink: PropTypes.string,
  extrainfoText: PropTypes.string,
  inputClass: PropTypes.string,
  wrapperClassName: PropTypes.string,
  size: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  inputStyles: PropTypes.shape({}),
};

_Input.defaultProps = {
  labelText: '',
  type: 'text',
  placeholder: '',
  suffix: null,
  prefix: null,
  extrainfoLink: '',
  extrainfoText: '',
  inputClass: '',
  wrapperClassName: '',
  size: 'large',
  value: '',
  errorMessage: '',
  disabled: false,
  inputStyles: {},
};

export default _Input;
