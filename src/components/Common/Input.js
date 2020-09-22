import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const _Input = ({
  name,
  labelText,
  placeholder,
  suffix,
  prefix,
  extrainfoLink,
  extrainfoText,
  inputClass,
  onChange,
  wrapperClassName,
  size,
}) => (
  <div name={name} className={`flex flex-col  ${wrapperClassName}`}>
    <div className="flex justify-between items-center mb-10p ">
      {labelText ? <label htmlFor={name}>{labelText}</label> : null}

      {extrainfoText && extrainfoLink ? (
        <div>
          <a className="c-input-extrainfo underline" href={extrainfoLink}>
            {extrainfoText}
          </a>
        </div>
      ) : null}
    </div>

    <Input
      onChange={onChange}
      name={name}
      size={size}
      className={`c-sufix-prefix-gray ${inputClass}`}
      id={name}
      placeholder={placeholder}
      suffix={suffix}
      prefix={prefix}
    />
  </div>
);

_Input.propTypes = {
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  suffix: PropTypes.node,
  prefix: PropTypes.node,
  extrainfoLink: PropTypes.string,
  extrainfoText: PropTypes.string,
  inputClass: PropTypes.string,
  wrapperClassName: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

_Input.defaultProps = {
  labelText: '',
  placeholder: '',
  suffix: null,
  prefix: null,
  extrainfoLink: '',
  extrainfoText: '',
  inputClass: '',
  wrapperClassName: '',
  size: 'large',
};

export default _Input;
