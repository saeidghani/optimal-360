import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import { parse } from '../../../hooks/useQuery';

import { dynamicMap } from '../../../routes/RouteMap';

import { generateNewPassword } from '../../../lib/utils';

import MainLayout from '../../Common/Layout';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const OrganizationsNewStaff = ({ addNewOrganizationStaff, loading }) => {
  const history = useHistory();
  const { organizationId } = useParams();

  const schema = yup.object({
    name: yup.string().required('Organization Name field is required'),
    email: yup.string().email('email is not valid').required('email feild is required'),
    password: yup
      .string()
      .min(8, 'password must  be at least 8 characters long')
      .required('password field is required'),
    department: yup.string(),
    jobDesignation: yup.string().required('Job Designation field is required'),
  });

  return (
    <MainLayout
      titleClass="mt-3"
      contentClass="py-6 pl-21 pr-6"
      breadCrumbItems={['Organizations', 'Users', 'New']}
      title="Organizations"
    >
      <div className="grid grid-cols-12 items-center justify-center min-h-screen">
        <div
          className="col-span-10 col-start-1 md:col-span-8 md:col-start-3
        lg:col-start-4 lg:col-span-6 xl:col-start-5 xl:col-span-4
        rounded-lg sm:px-16 px-4 sm:pb-10 sm:pt-12 py-6 bg-white"
        >
          <h2 className="text-xl font-medium text-heading mb-6">New Staff</h2>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              department: '',
              jobDesignation: '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                await addNewOrganizationStaff({ ...values, organizationId });

                const nextPath =
                  history.location.search && parse(history.location.search).prevUrl
                    ? parse(history.location.search).prevUrl
                    : dynamicMap.superUser.organizationStaffList({ organizationId });

                history.push(nextPath);
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
                  labelText="Name"
                  placeholder="Name"
                  wrapperClassName="mb-2"
                  errorMessage={touched.name && errors.name}
                />
                <Input
                  disabled={loading}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  labelText="Email"
                  placeholder="Email"
                  wrapperClassName="mb-2"
                  errorMessage={touched.email && errors.email}
                />
                <Input
                  disabled={loading}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  labelText="Password"
                  placeholder="Password"
                  wrapperClassName="mb-2"
                  extrainfoText="Generate Password"
                  extrainfoLink="#"
                  onExtraInfoLinkClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const newPassword = generateNewPassword();
                    setFieldValue('password', newPassword);
                  }}
                  errorMessage={touched.password && errors.password}
                />
                <Input
                  disabled={loading}
                  onChange={handleChange}
                  value={values.department}
                  name="department"
                  labelText="Department"
                  placeholder="Department"
                  wrapperClassName="mb-2"
                  errorMessage={touched.department && errors.department}
                />
                <Input
                  disabled={loading}
                  onChange={handleChange}
                  value={values.jobDesignation}
                  name="jobDesignation"
                  labelText="Job Designation"
                  placeholder="Job Designation"
                  wrapperClassName="mb-2"
                  errorMessage={touched.jobDesignation && errors.jobDesignation}
                />
                <Button
                  loading={loading}
                  onClick={handleSubmit}
                  htmlType="submit"
                  text="Create"
                  textSize="base"
                  className="ml-auto c-force-padding-y-px px-8 mt-6"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  );
};

OrganizationsNewStaff.propTypes = {
  addNewOrganizationStaff: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default OrganizationsNewStaff;
