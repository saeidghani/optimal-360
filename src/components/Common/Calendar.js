import React from 'react';
// import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import { FileDoneOutlined } from '@ant-design/icons';

const Calendar = (props) => <DatePicker className="w-30 h-10" suffixIcon={<FileDoneOutlined />} />;

// Calendar.propTypes = {};

// Calendar.defaultProps = {};

export default Calendar;
