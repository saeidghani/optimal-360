import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

// import { debounce } from '../../lib/util';

const _AutoComplete = ({
  wrapperClassName,
  className,
  onSelect,
  options,
  labelText,
  extrainfoText,
  extrainfoLink,
  onExtraInfoLinkClick,
  name,
  size,
  placeholder,
  onChange,
  value,
  errorMessage,
  loading,
}) => {
  return (
    <div name={name} className={`flex flex-col w-full ${wrapperClassName}`}>
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
                className="text-black underline text-antgray-100 text-12px pl-2 sm:pl-0"
                href={extrainfoLink}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  onExtraInfoLinkClick(e);
                }}
              >
                {extrainfoText}
              </a>
            </div>
          ) : null}
        </div>
      ) : null}

      <AutoComplete
        loading={loading}
        placeholder={placeholder}
        id={name}
        value={value}
        options={options}
        className={`c-autocomplete c-sufix-prefix-gray text-12px w-full ${className}`}
        onSelect={(_, val) => {
          // setValue('');
          onSelect(val);
        }}
        onChange={(val) => {
          // TODO
          // debounce(() => onChange(val));
          onChange(val);
        }}
        size={size}
      />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </div>
  );
};

_AutoComplete.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  labelText: PropTypes.string,
  extrainfoText: PropTypes.string,
  extrainfoLink: PropTypes.string,
  onExtraInfoLinkClick: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

_AutoComplete.defaultProps = {
  wrapperClassName: '',
  className: '',
  value: '',
  placeholder: '',
  labelText: '',
  extrainfoText: '',
  extrainfoLink: '',
  onExtraInfoLinkClick: '',
  name: '',
  size: 'large',
  errorMessage: '',
  loading: false,
};

export default _AutoComplete;
