import React from 'react';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Logo from '../Common/Logo';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';
import Button from '../Common/Button';

import Shape from './Helper/AnimatedShape';

const Login = ({ login }) => {
  const schema = yup.object({
    email: yup.string().required('email feild is required'),
    password: yup
      .string()
      .min(8, 'password must  be at least 8 characters long')
      .required('password field is required'),
  });

  return (
    <div className="min-h-screen bg-white relative flex flex-row items-center justify-center">
      <div className="absolute top-0 left-0 flex flex-row pl-8 pt-6 md:pl-20 lg:pl-32 lg:pt-12">
        <Logo />
      </div>

      <div className="grid grid-cols-12 gap-x-4x w-full xl:mt-16">
        <div
          className="md:col-span-5 md:col-start-2 xl:col-span-6 xl:col-start-1
       hidden md:flex justify-center items-center"
        >
          <Shape />
        </div>

        <div
          className="col-start-2 col-span-10 md:col-span-4 md:col-start-8
       flex flex-col items-center xl:pr-24 pt-6"
        >
          <h1 className="font-medium text-2xl w-full block text-left mb-10">Login</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberMe: false,
            }}
            validationSchema={schema}
            onSubmit={async (values) => {
              await login(values);
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
              <Form className="w-full">
                <Input
                  disabled={isSubmitting}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  wrapperClassName="mb-12"
                  labelText="Email"
                  placeholder="Email"
                  errorMessage={touched.email && errors.email}
                />

                <Input
                  value={values.password}
                  disabled={isSubmitting}
                  onChange={handleChange}
                  name="password"
                  wrapperClassName="mb-4"
                  labelText="Password"
                  placeholder="Password"
                  extrainfoText="Forgot Password ?"
                  extrainfoLink="/forgot-password"
                  errorMessage={touched.password && errors.password}
                />

                <Checkbox
                  checked={values.rememberMe}
                  onChange={(val) => setFieldValue('rememberMe', val)}
                  className="text-gray-300 "
                >
                  Remember Me
                </Checkbox>

                <Button
                  loading={isSubmitting}
                  onClick={handleSubmit}
                  text="Log in"
                  className="ml-auto mt-16 py-4 px-6"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default Login;
