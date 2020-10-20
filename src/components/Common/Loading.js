import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Modal } from 'antd';

const Loading = ({ visible }) => (
  <Modal wrapClassName="c-loading" footer="" closable={false} centered visible={visible}>
    <Spin size="large" />
  </Modal>
);

Loading.propTypes = {
  visible: PropTypes.bool,
};

Loading.defaultProps = {
  visible: false,
};

export default Loading;
