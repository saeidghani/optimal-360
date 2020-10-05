import React from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';

import MainLayout from '../Common/Layout';

import Input from '../Common/Input';
import Button from '../Common/Button';
import AutoComplete from '../Common/AutoComplete';

const SetAdmin = ({ loading }) => {
  const schema = yup.object({
    organization: yup.string().required('organization feild is required'),
    project: yup.string().required('project feild is required'),
  });

  return (
    <MainLayout
      hasBreadCrumb={false}
      contentClass="flex flex-row min-h-screen items-center justify-around p-0"
    >
      <div className="bg-white rounded-7px  sm:px-16 sm:pb-18 sm:pt-22 px-4 py-6">
        <Formik
          initialValues={{
            organization: '',
            project: '',
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form>
              <Input
                disabled={isSubmitting}
                onChange={handleChange}
                value={values.organization}
                name="organization"
                type="organization"
                labelText="Organization"
                placeholder="Name of Organization"
                errorMessage={touched.organization && errors.organization}
                wrapperClassName="c-min-w-form-input mb-6"
                extrainfoText="Create New"
                extrainfoLink="#"
              />

              <Input
                value={values.project}
                disabled={isSubmitting}
                onChange={handleChange}
                name="project"
                labelText="Project Name"
                placeholder="Name"
                errorMessage={touched.project && errors.project}
                wrapperClassName="c-min-w-form-input mb-6"
              />

              <AutoComplete
                options={[
                  { label: 'aTest', value: 'atest' },
                  { label: 'bTest', value: 'btest' },
                  { label: 'cTest', value: 'ctest' },
                ]}
              />

              <Button
                loading={loading}
                onClick={handleSubmit}
                text="Next"
                className="ml-auto c-force-padding-y-px px-8 mt-14"
              />
            </Form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
};

SetAdmin.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default SetAdmin;
