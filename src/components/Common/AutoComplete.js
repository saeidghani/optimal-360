import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Button from './Button';

const _AutoComplete = ({ className, onSearch, onSelect, options, inputName, placeholder }) => {
  const [value, setValue] = useState('');

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <AutoComplete
      value={value}
      options={options}
      className={` ${className}`}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
    >
      <Input
        inputName={inputName}
        placeholder={placeholder}
        suffix={
          <Button
            onClick={() => console.log('button')}
            text={<SearchOutlined style={{ verticalAlign: '0.107rem' }} />}
            shape="circle"
          />
        }
      />
    </AutoComplete>
  );
};

_AutoComplete.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
  onSelect: PropTypes.func,
  options: PropTypes.string,
  inputName: PropTypes.string,
  placeholder: PropTypes.string,
};

_AutoComplete.defaultProps = {
  className: '',
  onSearch: console.log('onSearch'),
  onSelect: console.log('onSelect'),
  options: '',
  inputName: '',
  placeholder: '',
};

export default _AutoComplete;
