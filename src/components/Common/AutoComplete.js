import React from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

const { Option } = AutoComplete;

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
  disabled,
}) => (
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

    <AutoComplete
      disabled={disabled}
      loading={loading}
      placeholder={placeholder}
      id={name}
      value={value}
      className={`c-autocomplete c-sufix-prefix-gray text-12px w-full ${className}`}
      dropdownClassName="capitalize"
      onSelect={(_, val) => {
        const selectedItem = options.find(({ id }) => id * 1 === val.key * 1);

        onSelect(selectedItem);
      }}
      onChange={(txt, selectedItem) => onChange(selectedItem.children || txt)}
      size={size}
    >
      {options.map(({ id, label }) => (
        <Option key={id}>{label}</Option>
      ))}
    </AutoComplete>

    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
  </div>
);

_AutoComplete.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  labelText: PropTypes.string,
  extrainfoText: PropTypes.string,
  extrainfoLink: PropTypes.string,
  onExtraInfoLinkClick: PropTypes.func,
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
  disabled: PropTypes.bool,
};

_AutoComplete.defaultProps = {
  wrapperClassName: '',
  className: '',
  value: '',
  placeholder: '',
  labelText: '',
  extrainfoText: '',
  extrainfoLink: '',
  onExtraInfoLinkClick: () => {},
  name: '',
  size: 'large',
  errorMessage: '',
  loading: false,
  disabled: false,
};

export default _AutoComplete;
