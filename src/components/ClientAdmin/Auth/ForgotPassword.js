import React from 'react';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

import AuthLayout from './Helper/AuthLayout';

const ForgotPassword = ({ loading, forgotPassword }) => {
  const schema = yup.object({
    email: yup.string().email('email is not valid').required('email feild is required'),
  });

  return (
    <AuthLayout className="grid grid-cols-12 items-center justify-center my-auto pb-8 lg:pb-16">
      <div
        className="bg-white rounded-lg col-start-2 col-span-10 xl:col-start-4 xl:col-span-6 py-8 px-4
       sm:py-16 sm:px-12 lg:px-28 lg:pt-24 lg:pb-28"
      >
        <h1 className="font-medium text-2xl w-full block text-left">Reset Password</h1>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            forgotPassword(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <Form className="w-full">
              <Input
                disabled={loading}
                onChange={handleChange}
                value={values.email}
                name="email"
                type="email"
                wrapperClassName="mt-10 mb-12"
                labelText="Email"
                placeholder="Email"
                errorMessage={touched.email && errors.email}
              />

              <Button
                loading={loading}
                onClick={handleSubmit}
                text="Submit"
                textSize="16px"
                className="ml-auto c-force-padding-y-px px-7 w-full sm:w-auto"
              />
            </Form>
          )}
        </Formik>
      </div>
    </AuthLayout>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ForgotPassword;
