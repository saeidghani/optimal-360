import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';

import { dynamicMap } from '../../../routes/RouteMap';

import MainLayout from '../../Common/Layout';
import Input from '../../Common/Input';
import Button from '../../Common/Button';
import UploadAvatar from '../../Common/UploadAvatar';

const NewOrganizations = ({ addNewOrganization, loading }) => {
  const history = useHistory();

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
              logo: '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                await addNewOrganization(values);

                history.push(dynamicMap.superUser.organizationsList());
              } catch (error) {}
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
                <UploadAvatar
                  wrapperClassName="mt-14 mb-3"
                  title=""
                  pickedTitle="Organization picture"
                  setFile={(file) => setFieldValue('logo', file)}
                  file={values.clientPicture}
                />
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
