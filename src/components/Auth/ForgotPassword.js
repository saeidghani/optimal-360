import React from 'react';
import { Formik, Form } from 'formik';

import Layout from './Layout';

import Input from '../Common/Input';
import Button from '../Common/Button';

const ForgotPassword = (props) => (
  <Layout>
    <h1 className="font-medium text-3xl w-full block text-left">Reset Password</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form className="w-full">
        <Input
          wrapperClassName="my-12"
          labelText="Password"
          placeholder="Password"
          extrainfoText="Forgot Password ?"
        />

        <Button className="ml-auto">Submit</Button>
      </Form>
    </Formik>
  </Layout>
);

export default ForgotPassword;
