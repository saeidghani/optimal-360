import React from 'react';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Input from '../Common/Input';
import Button from '../Common/Button';

import Layout from './Helper/Layout';

const ForgotPassword = ({ loading, forgotPassword }) => {
  const schema = yup.object({
    email: yup.string().email('email is not valid').required('email feild is required'),
  });

  return (
    <Layout>
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
              className="ml-auto c-force-padding-y-px px-7"
            />
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ForgotPassword;
