import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const _Input = ({
  name,
  type,
  labelText,
  placeholder,
  suffix,
  prefix,
  extrainfoLink,
  onExtraInfoLinkClick,
  extrainfoText,
  inputClass,
  value,
  onChange,
  wrapperClassName,
  size,
  disabled,
  fixedHeightForErrorMessage,
  errorMessage,
  inputStyles,
  onPressEnter,
}) => {
  const [_type, setType] = React.useState(type);

  return (
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
              <a
                tabIndex="-1"
                className="text-black underline text-antgray-100 text-12px pl-2 sm:pl-0"
                href={extrainfoLink}
                onClick={(e) => {
                  if (!extrainfoLink) {
                    e.preventDefault();
                    e.stopPropagation();
                  }

                  onExtraInfoLinkClick(e);
                }}
              >
                {extrainfoText}
              </a>
            </div>
          ) : null}
        </div>
      ) : null}

      <Input
        type={_type}
        // type={type}
        disabled={disabled}
        onChange={onChange}
        value={value}
        name={name}
        size={size}
        className={`c-sufix-prefix-gray text-12px ${inputClass}`}
        style={inputStyles}
        id={name}
        placeholder={placeholder}
        suffix={
          suffix ||
          (type === 'password' ? (
            _type === 'password' ? (
              <EyeInvisibleOutlined onClick={() => setType('text')} />
            ) : (
              <EyeOutlined onClick={() => setType('password')} />
            )
          ) : null)
        }
        prefix={prefix}
        onPressEnter={onPressEnter}
      />

      <p className={`text-red-500 ${fixedHeightForErrorMessage && 'h-5'} mt-1`}>{errorMessage}</p>
    </div>
  );
};

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
  fixedHeightForErrorMessage: PropTypes.bool,
  errorMessage: PropTypes.string,
  inputStyles: PropTypes.shape({}),
  onExtraInfoLinkClick: PropTypes.func,
  onPressEnter: PropTypes.func,
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
  fixedHeightForErrorMessage: true,
  inputStyles: {},
  onExtraInfoLinkClick: () => {},
  onPressEnter: () => {},
};

export default _Input;
