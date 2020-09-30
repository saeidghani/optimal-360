import React from 'react';
// import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Input from '../Common/Input';
import Button from '../Common/Button';

import Layout from './Helper/Layout';
import Success from './Success';

const ForgotPassword = () => {
  const [done, setDone] = React.useState(false);
  // const schema = yup.object({
  //   password: yup
  //     .string()
  //     .min(8, 'password must  be at least 8 characters long')
  //     .required('password field is required'),
  // });

  return (
    <Layout>
      {done ? (
        <Success />
      ) : (
        <>
          <h1 className="font-medium text-2xl w-full block text-left">Reset Password</h1>
          <Formik
            initialValues={{
              email: '',
            }}
            // validationSchema={schema}
            onSubmit={async (values) => {
              setDone(true);
              // await new Promise((r) => setTimeout(r, 500));
              // alert(JSON.stringify(values, null, 2));
            }}
          >
            {/* eslint-disable-next-line no-unused-vars */}
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
              <Form className="w-full">
                <Input
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  wrapperClassName="mt-10 mb-12"
                  labelText="Email"
                  placeholder="Email"
                  type="email"
                />

                <Button
                  onClick={handleSubmit}
                  text="Submit"
                  textSize="16px"
                  className="ml-auto c-force-padding-y-px px-7"
                />
              </Form>
            )}
          </Formik>
        </>
      )}
    </Layout>
  );
};

export default ForgotPassword;
