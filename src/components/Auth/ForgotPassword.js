import React from 'react';
import { Formik, Form } from 'formik';

import Layout from './Layout';

import Input from '../Common/Input';
import Button from '../Common/Button';

const ForgotPassword = () => (
  <Layout>
    <h1 className="font-medium text-3xl w-full block text-left">Reset Password</h1>
    <Formik
      initialValues={{
        password: '',
      }}
      onSubmit={async (values) => {
        console.log({ values });
        // await new Promise((r) => setTimeout(r, 500));
        // alert(JSON.stringify(values, null, 2));
      }}
    >
      {/* eslint-disable-next-line no-unused-vars */}
      {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
        <Form className="w-full">
          <Input
            onChange={handleChange}
            name="password"
            wrapperClassName="my-12"
            labelText="Password"
            placeholder="Password"
          />

          <Button onClick={handleSubmit} text="Submit" className="ml-auto" />
        </Form>
      )}
    </Formik>
  </Layout>
);

export default ForgotPassword;
