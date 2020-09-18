import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
const _Input = ({
  inputName,
  labelText,
  placeholder,
  rules,
  suffix,
  prefix,
  extrainfoLink,
  extrainfoText,
}) => {
  return (
    <Form.Item name={inputName} rules={rules} className="flex flex-col">
      <div className="flex justify-between items-center mb-1">
        <label className="ant-typography" for={inputName}>
          {labelText}
        </label>
        <div>
          {/* use tailwind css as much as possible there is no need for 'c-input-extrainfo' */}
          <a className="c-input-extrainfo underline" href={extrainfoLink}>
            {extrainfoText}
          </a>
        </div>
      </div>

      <Input
        id={inputName}
        placeholder={placeholder}
        suffix={suffix}
        prefix={prefix}
        // use the right syntax for here
        className={'c-sufix-prefix-gray'}
      />
    </Form.Item>
  );
};

_Input.propTypes = {
  inputName: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  placeholder: PropTypes.string,
  rules: PropTypes.string,
  extrainfoLink: PropTypes.string,
  extrainfoText: PropTypes.string,
};

_Input.defaultProps = {
  labelText: '',
  placeholder: '',
  rules: '',
  suffix: null,
  prefix: null,
  extrainfoLink: '',
  extrainfoText: '',
};

export default _Input;
