import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../../Common/Modal';

const ChangeSurveyGroupModal = ({ visible, currentSurveyGroup, handleOk, handleCancel }) => (
  <Modal
    okText="Discard These Settings"
    cancelText="Countinue"
    visible={visible}
    cancelButtonText="Countinue"
    okButtonText="Discard These Settings"
    handleOk={handleOk}
    handleCancel={handleCancel}
  >
    <h3 className="text-lg text-body mb-3">Attention!</h3>

    <p className="text-sm text-secondary">
      You have not completed {`“${currentSurveyGroup}”`} settings, moving to another survey group
      would discard all data you have entered here! Are you sure to move?
    </p>
  </Modal>
);

ChangeSurveyGroupModal.propTypes = {
  visible: PropTypes.bool,
  currentSurveyGroup: PropTypes.string,
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

ChangeSurveyGroupModal.defaultProps = {
  visible: false,
  currentSurveyGroup: '',
};

export default ChangeSurveyGroupModal;
