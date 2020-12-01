import React from 'react';
import PropTypes from 'prop-types';

import { Upload } from 'antd';

import Button from './Button';

const ImportExcelButton = ({
                             beforeUpload,
                             buttonText,
                             type,
                             buttonClassName,
                             className,
                             textClassName,
                             icon,
                             textSize,
                             ...other
                           }) => (
  <Upload
    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    beforeUpload={beforeUpload}
    showUploadList={false}
    customRequest={() => {
      // override default 'POST' method from antd/Upload
    }}
    className={className}
  >
    <Button
      className={`flex items-center ${buttonClassName}`}
      text={buttonText}
      textClassName={`${icon !== '' && 'pr-3'} ${textClassName}`}
      size="middle"
      textSize={textSize}
      icon={icon}
      iconPosition="right"
      type={type}
      onClick={() => {
      }}
      {...other}
    />
  </Upload>
);

ImportExcelButton.propTypes = {
  beforeUpload: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  type: PropTypes.string,
  buttonClassName: PropTypes.string,
  textClassName: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.string,
  textSize: PropTypes.string,
};

ImportExcelButton.defaultProps = {
  buttonText: 'Import Excel File',
  type: 'gray',
  buttonClassName: '',
  textClassName: '',
  className: '',
  icon: 'FileExcelOutlined',
  textSize: 'xs',
};

export default ImportExcelButton;
