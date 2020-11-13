import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import Input from '../../../Common/Input';
import Modal from '../../../Common/Modal';

const AddClusterModal = ({ visible, onSave, onCancel }) => {
  const formRef = React.useRef();
  const schema = yup.object({
    name: yup.string().required('Cluster Name is required'),
  });

  return (
    <Modal
      destroyOnClose
      cancelText="Cancel"
      handleCancel={onCancel}
      okText="Add"
      handleOk={() => {
        if (formRef.current) formRef.current.submitForm();
      }}
      visible={visible}
    >
      <Formik
        innerRef={formRef}
        initialValues={{
          name: '',
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSave(values);
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="col-span-12">
                <h2 className="text-secondary text-lg">Add Cluster</h2>
              </div>

              <div className="col-span-8 mt-8">
                <Input
                  labelText="Cluster Name"
                  name="name"
                  placeholder="Cluster Name"
                  value={values.name}
                  onChange={handleChange}
                  errorMessage={touched.name && errors.name}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

AddClusterModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

AddClusterModal.defaultProps = {
  visible: false,
};

export default AddClusterModal;
