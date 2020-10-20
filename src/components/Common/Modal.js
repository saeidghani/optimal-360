import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

const _Modal = ({ visible, handleOk, handleCancel, children }) => (
  <Modal
    centered
    title=""
    visible={visible}
    onOk={handleOk}
    onCancel={handleCancel}
    okButtonProps={{ type: 'primary', className: 'px-6 ' }}
    cancelButtonProps={{ type: 'link', className: 'px-6 ' }}
    closable={false}
  >
    {children}
  </Modal>
);

_Modal.propTypes = {
  visible: PropTypes.string.isRequired,
  handleCancel: PropTypes.func,
  handleOk: PropTypes.func,
};

_Modal.defaultProps = {
  handleCancel: () => console.log('cancel'),
  handleOk: () => console.log('ok'),
};

export default _Modal;
