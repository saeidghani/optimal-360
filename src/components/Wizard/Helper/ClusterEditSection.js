import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import Button from '../../Common/Button';
import Input from '../../Common/Input';

const ClusterEditSection = ({ selectedCluster, onCancel, onSave }) => {
  const schema1 = yup.object({
    clusterName: yup.string().required('Cluster name is required'),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        clusterName: selectedCluster?.name,
      }}
      validationSchema={schema1}
      onSubmit={async (values) => {
        console.log({ values });
        // setSurveyQuestions()
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <Form onSubmit={handleSubmit}>
          <div
            className="flex flex-row justify-between bg-antgray-600 p-4
        items-center border-b border-list-border"
          >
            <p className="text-body">
              All {' > '} {values.clusterName} {' > '} Edit
            </p>

            <div className="flex flex-row items-center">
              <Button onClick={onCancel} text="Cancel" type="link" size="small" textSize="base" />
              <Button onClick={onSave} text="Save" ghost size="small" textSize="base" />
            </div>
          </div>

          <div className="flex flex-col">
            <Input
              labelText="Cluster"
              errorMessage={touched.clusterName && errors.clusterName}
              placeholder="Cluster Name"
              value={values.clusterName}
              onChange={handleChange}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

ClusterEditSection.propTypes = {
  selectedCluster: PropTypes.shape({
    name: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

ClusterEditSection.defaultProps = {
  selectedCluster: {
    name: '',
  },
};

export default ClusterEditSection;
