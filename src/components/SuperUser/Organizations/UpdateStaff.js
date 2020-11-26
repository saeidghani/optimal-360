import React from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useHistory, useParams } from 'react-router-dom';

import { dynamicMap } from '../../../routes/RouteMap';

import MainLayout from '../../Common/Layout';
import Input from '../../Common/Input';
import Button from '../../Common/Button';

const UpdateStaff = ({ fetchStaffDetails, staffDetails, setStaffDetails, loading }) => {
  const history = useHistory();
  const { organizationId, staffId } = useParams();

  React.useEffect(() => {
    if (organizationId && staffId) fetchStaffDetails({ organizationId, staffId });
  }, []);

  const schema = yup.object({
    name: yup.string().required('Organization Name field is required'),
    email: yup.string().email('email is not valid').required('email feild is required'),
    password: yup
      .string()
      .min(8, 'password must  be at least 8 characters long')
      .required('password field is required'),
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
          <h2 className="text-xl font-medium text-heading mb-6">New Staff</h2>
          <Formik
            enableReinitialize
            initialValues={{
              name: staffDetails?.data?.name || '',
              email: staffDetails?.data?.email || '',
              password: staffDetails?.data?.password || '',
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              try {
                await setStaffDetails({ ...values, organizationId, staffId });

                const path = dynamicMap.superUser.organizationStaffList({ organizationId });
                history.push(path);
              } catch (error) {}
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
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
                  errorMessage={touched.password && errors.password}
                />
                <Button
                  loading={loading}
                  onClick={handleSubmit}
                  htmlType="submit"
                  text="Save"
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

UpdateStaff.propTypes = {
  fetchStaffDetails: PropTypes.func.isRequired,
  setStaffDetails: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  staffDetails: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  }),
};

UpdateStaff.defaultProps = {
  staffDetails: {},
};

export default UpdateStaff;
