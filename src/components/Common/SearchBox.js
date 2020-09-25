import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const { Search } = Input;

const SearchBox = ({ placeholder, loading, onSearch }) => (
  <Search placeholder={placeholder} onSearch={onSearch} loading={loading} />
);

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  onSearch: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  placeholder: 'Search',
  loading: false,
};

export default SearchBox;
