import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const _Input = ({
  inputName,
  labelText,
  placeholder,
  suffix,
  prefix,
  extrainfoLink,
  extrainfoText,
  inputClass,
  wrapperClass,
  size,
}) => (
  <div name={inputName} className={`flex flex-col  ${wrapperClass}`}>
    {/* put fisrt if in place for stopping unpredicted
     positioning on only input filed (without label) */}
    {labelText === '' && extrainfoText === '' ? null : (
      <div className="flex justify-between items-center mb-10p ">
        {labelText === '' ? null : (
          <label className="" htmlFor={inputName}>
            {labelText}
          </label>
        )}
        {extrainfoText === '' ? null : (
          <div>
            <a className="c-input-extrainfo underline" href={extrainfoLink}>
              {extrainfoText}
            </a>
          </div>
        )}
      </div>
    )}

    <Input
      size={size}
      className={`c-sufix-prefix-gray ${inputClass}`}
      id={inputName}
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
    />
  </div>
);

_Input.propTypes = {
  inputName: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.node,
  prefix: PropTypes.node,
  extrainfoLink: PropTypes.string,
  extrainfoText: PropTypes.string,
  inputClass: PropTypes.string,
  wrapperClass: PropTypes.string,
  size: PropTypes.string,
};

_Input.defaultProps = {
  labelText: '',
  placeholder: '',
  suffix: null,
  prefix: null,
  extrainfoLink: '',
  extrainfoText: '',
  inputClass: '',
  wrapperClass: '',
  size: 'large',
};

export default _Input;
