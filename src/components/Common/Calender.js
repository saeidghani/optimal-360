import React from 'react';
// import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';

const Calender = (props) => <DatePicker className="w-30 h-10" suffixIcon={<FileDoneOutlined />} />;

// Calender.propTypes = {};

// Calender.defaultProps = {};

export default Calender;
