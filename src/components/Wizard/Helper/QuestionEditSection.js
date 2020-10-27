import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';

import Button from '../../Common/Button';
import Input from '../../Common/Input';
import Checkbox from '../../Common/Checkbox';
import AutoComplete from '../../Common/AutoComplete';

const CompetencyEditSection = ({ data, onSave, onCancel, clusterName, competencyName }) => {
  const schema = yup.object({
    name: yup.string().required('Question label is required'),
    statement: yup.string().required('Question statement is required'),
  });

  const formRef = React.useRef();
  const questionName = data?.name;

  console.log({ data });

  return (
    <Formik
      innerRef={formRef}
      enableReinitialize
      initialValues={data}
      validationSchema={schema}
      onSubmit={(values) => {
        onSave(values);
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange, setFieldValue }) => (
        <Form onSubmit={handleSubmit}>
          <div
            className="flex flex-row justify-between bg-antgray-600 p-4
        items-center border-b border-list-border"
          >
            <p className="text-body">
              All {' > '} {clusterName} {' > '} {competencyName} {' > '} {questionName} {' > '}
              Edit
            </p>

            <div className="flex flex-row items-center">
              <Button onClick={onCancel} text="Cancel" type="link" size="small" textSize="base" />
              <Button onClick={handleSubmit} text="Save" ghost size="small" textSize="base" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-5">
            <div className="col-span-6">
              <Input
                labelText="Question Label"
                name="name"
                placeholder="Question Label"
                value={values.name}
                onChange={handleChange}
                errorMessage={touched.name && errors.name}
              />
            </div>

            <div className="col-span-6">
              <AutoComplete
                wrapperClassName="capitalize"
                labelText="Statement Type"
                onSelect={(item) => setFieldValue('statementType', item.value)}
                placeholder="Search"
                options={['positive', 'negative'].map((val, i) => ({
                  label: val,
                  value: val,
                  key: i,
                }))}
                onChange={() => {}}
                value={values.statementType}
                errorMessage={touched.statementType && errors.statementType}
              />
            </div>

            <div className="col-span-12 my-8">
              <Input
                labelText="Question Statement"
                name="statement"
                placeholder="Question Statement"
                value={values.statement}
                onChange={handleChange}
                errorMessage={touched.statement && errors.statement}
              />
            </div>
          </div>

          <Checkbox
            checked={values.required}
            onChange={(required) => setFieldValue('required', required)}
          >
            This question is required to answer
          </Checkbox>
        </Form>
      )}
    </Formik>
  );
};

CompetencyEditSection.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  clusterName: PropTypes.string,
  competencyName: PropTypes.string,
};

CompetencyEditSection.defaultProps = {
  data: {
    name: '',
  },
  clusterName: '',
  competencyName: '',
};

export default CompetencyEditSection;
