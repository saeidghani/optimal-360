import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import MainLayout from '../../Common/Layout';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const NewOrganizations = ({ addNewOrganization, loading }) => {
  const schema = yup.object({
    name: yup.string().required('Organization Name field is required'),
    logo: yup.string().required('Logo is required'),
  });

  return (
    <MainLayout
      titleClass="mt-3"
      contentClass="py-6 pl-21 pr-6"
      hasBreadCrumb
      title="Organizations"
    >
      <div className="grid grid-cols-12 items-center justify-center min-h-screen">
        <div
          className="col-span-10 col-start-1 md:col-span-8 md:col-start-3
        lg:col-start-4 lg:col-span-6 xl:col-start-5 xl:col-span-4
        rounded-lg sm:px-16 px-4 sm:pb-10 sm:pt-12 py-6 bg-white"
        >
          <h2 className="text-xl font-medium text-heading mb-6">New Organization</h2>
          <Formik
            initialValues={{
              name: '',
              logo: '/20200909/photos-0cf793d1-5cbc-46f3-9aea-87ca1c0a9007.jpg', // TODO: upload logo
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              addNewOrganization(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (

              <Form onSubmit={handleSubmit} className="w-full">
                <Input
                  disabled={loading}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  labelText="Organization"
                  placeholder="Organization Name"
                  wrapperClassName="mb-2"
                  errorMessage={touched.name && errors.name}
                />
                <Button text="Upload Logo" textSize="xs" type="gray" className="px-2" />
                <Button
                  loading={loading}
                  onClick={handleSubmit}
                  text="Create"
                  textSize="base"
                  className="ml-auto c-force-padding-y-px px-8 mt-10"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

NewOrganizations.propTypes = {
  addNewOrganization: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NewOrganizations;
