import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import Input from '../../../Common/Input';
import Checkbox from '../../../Common/Checkbox';
import Modal from '../../../Common/Modal';
import AutoComplete from '../../../Common/AutoComplete';

const AddFeedbackModal = ({ visible, onSave, onCancel }) => {
  const formRef = React.useRef();
  const schema = yup.object({
    label: yup.string().required('Question label is required'),
    statement: yup.string().required('Question statement is required'),
    required: yup.bool(),
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
          label: '',
          statement: '',
          statementType: 'positive',
          required: true,
        }}
        validationSchema={schema}
        onSubmit={(values) => {
          onSave(values);
        }}
      >
        {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-x-5">
              <div className="col-span-12 mb-5">
                <h2 className="text-secondary text-lg">Add Question</h2>
              </div>

              <div className="col-span-6">
                <Input
                  labelText="Question Label"
                  name="label"
                  placeholder="Question Label"
                  value={values.label}
                  onChange={handleChange}
                  errorMessage={touched.label && errors.label}
                />
              </div>

              <div className="col-span-6">
                <AutoComplete
                  labelText="Statement Type"
                  onSelect={(item) => setFieldValue('statementType', item.value.toLowerCase())}
                  placeholder="Search"
                  options={['positive', 'negative'].map((val, i) => ({
                    label: val.charAt(0).toUpperCase() + val.slice(1),
                    value: val,
                    key: i,
                    id: i,
                  }))}
                  onChange={() => {}}
                  value={
                    values.statementType
                      ? values.statementType.charAt(0).toUpperCase() + values.statementType.slice(1)
                      : ''
                  }
                  errorMessage={touched.statementType && errors.statementType}
                />
              </div>

              <div className="col-span-12 mt-2">
                <Input
                  labelText="Question Statement"
                  name="statement"
                  placeholder="Question Statement"
                  value={values.statement}
                  onChange={handleChange}
                  onPressEnter={handleSubmit}
                  errorMessage={touched.statement && errors.statement}
                />
              </div>

              <div className="col-span-12">
                <Checkbox
                  checked={values.required}
                  onChange={(required) => setFieldValue('required', required)}
                >
                  This question is required to answer
                </Checkbox>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

AddFeedbackModal.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

AddFeedbackModal.defaultProps = {
  visible: false,
};

export default AddFeedbackModal;
