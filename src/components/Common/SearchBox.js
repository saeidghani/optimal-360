import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

const SearchBox = ({ placeholder, loading, onSearch, onChange, onPressEnter, className, value }) => (
  <Search
    className={`h-8 ${className}`}
    placeholder={placeholder}
    loading={loading}
    onSearch={onSearch}
    onChange={onChange}
    onPressEnter={onPressEnter}
    value={value}
  />
);

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onPressEnter: PropTypes.func,
  value: PropTypes.string.isRequired,
};

SearchBox.defaultProps = {
  placeholder: 'Search',
  className: '',
  loading: false,
  onChange: () => { },
  onPressEnter: () => { },
};

export default SearchBox;
