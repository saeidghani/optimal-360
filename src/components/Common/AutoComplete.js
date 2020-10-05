import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete } from 'antd';

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
}) => {
  const [value, setValue] = useState('');
  const [_options, setOptions] = useState(options);

  React.useEffect(() => {
    const newOptions = [];

    options.forEach((el) => {
      if (!value || el.value.toLowerCase().includes(value.toLowerCase())) {
        newOptions.push(el);
      }
    });

    setOptions(newOptions);
  }, [options, value]);

  const onChange = (data) => {
    setValue(data);
  };

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
        placeholder={placeholder}
        id={name}
        value={value}
        options={_options}
        className={`c-autocomplete c-sufix-prefix-gray text-12px w-full ${className}`}
        onSelect={(_, val) => onSelect(val)}
        onChange={onChange}
        size={size}
      />
    </div>
  );
};

_AutoComplete.propTypes = {
  wrapperClassName: PropTypes.string,
  className: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  options: PropTypes.string,
  labelText: PropTypes.string,
  extrainfoText: PropTypes.string,
  extrainfoLink: PropTypes.string,
  onExtraInfoLinkClick: PropTypes.func,
  name: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
};

_AutoComplete.defaultProps = {
  wrapperClassName: '',
  className: '',
  placeholder: '',
  options: '',
  labelText: '',
  extrainfoText: '',
  extrainfoLink: '',
  onExtraInfoLinkClick: '',
  name: '',
  size: 'large',
};

export default _AutoComplete;
