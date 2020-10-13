import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import Button from './Button';

const _Modal = ({
  title,
  className,
  footerClassName,
  footer,
  visible,
  handleOk,
  handleCancel,
  children,
  okButtonProps,
  cancelButtonProps,
  okText,
  cancelText,
  width,
}) => (
  <Modal
    className={`p-0 ${className}`}
    centered
    title={title}
    visible={visible}
    closable={false}
    width={width}
    footer={
      footer || (
        <div className={`flex flex-row justify-end rounded-b-7px mt-8 ${footerClassName}`}>
          <Button
            onClick={handleCancel}
            type="link"
            textSize="base"
            text={cancelText}
            {...cancelButtonProps}
          />
          <Button
            onClick={handleOk}
            type="primary"
            textSize="base"
            text={okText}
            {...okButtonProps}
          />
        </div>
      )
    }
  >
    {children}
  </Modal>
);

_Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  handleCancel: PropTypes.func.isRequired,
  handleOk: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  footer: PropTypes.node,
  footerClassName: PropTypes.string,
  okButtonProps: PropTypes.string,
  cancelButtonProps: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  width: PropTypes.number,
};

_Modal.defaultProps = {
  visible: false,
  children: '',
  footer: '',
  title: '',
  className: '',
  footerClassName: '',
  okButtonProps: '',
  cancelButtonProps: '',
  okText: '',
  cancelText: '',
  width: 679,
};

export default _Modal;
