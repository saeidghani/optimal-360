import React from 'react';
import PropTypes from 'prop-types';

import { Upload } from 'antd';

import Button from './Button';

const ImportExcelButton = ({ beforeUpload, buttonText }) => (
  <Upload
    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    beforeUpload={beforeUpload}
    showUploadList={false}
    customRequest={() => {
      // override default 'POST' method from antd/Upload
    }}
  >
    <Button
      className="flex items-center"
      text={buttonText}
      textClassName="pr-3"
      size="middle"
      textSize="xs"
      icon="FileExcelOutlined"
      iconPosition="right"
      type="gray"
      onClick={() => {}}
    />
  </Upload>
);

ImportExcelButton.propTypes = {
  beforeUpload: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

ImportExcelButton.defaultProps = {
  buttonText: 'Import Excel File',
};

export default ImportExcelButton;
