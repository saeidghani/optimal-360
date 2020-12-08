import React from 'react';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import Input from '../../Common/Input';
import Checkbox from '../../Common/Checkbox';
import Button from '../../Common/Button';

import { dynamicMap } from '../../../routes/RouteMap';

import Shape from './Helper/AnimatedShape';
import AuthLayout from './Helper/AuthLayout';

const Login = ({ login, loading }) => {
  const schema = yup.object({
    email: yup.string().email('email is not valid').required('email is required'),
    password: yup
      .string()
      .min(8, 'password must  be at least 8 characters long')
      .required('password field is required'),
  });

  return (
    <AuthLayout isLogin>
      <div className="grid grid-cols-12 gap-x-4 w-full xl:mt-16">
        <div
          className="md:col-span-5 md:col-start-2 xl:col-span-6 xl:col-start-1
              hidden md:flex justify-center items-center"
        >
          <Shape />
        </div>

        <div
          className="col-start-2 col-span-10 md:col-span-4 md:col-start-8
       flex flex-col justify-center items-center xl:pr-24 pt-6"
        >
          <h1 className="font-medium text-2xl w-full block text-left mb-10">Login</h1>
          <Formik
            initialValues={{
              email: '',
              password: '',
              rememberMe: false,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              login(values);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, setFieldValue }) => (
              <Form onSubmit={handleSubmit} className="w-full">
                <Input
                  disabled={loading}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  type="email"
                  wrapperClassName="mb-12"
                  labelText="Email"
                  placeholder="Email"
                  errorMessage={touched.email && errors.email}
                  onPressEnter={handleSubmit}
                />

                <Input
                  inputClass="c-input-sm-placeholder h-10 py-0"
                  value={values.password}
                  disabled={loading}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  wrapperClassName="mb-4"
                  labelText="Password"
                  placeholder="Password"
                  extrainfoText="Forgot Password?"
                  extrainfoLink={dynamicMap.clientAdmin.forgotPassword()}
                  errorMessage={touched.password && errors.password}
                  onPressEnter={handleSubmit}
                />

                <Checkbox
                  checked={values.rememberMe}
                  onChange={(val) => setFieldValue('rememberMe', val)}
                  className="text-gray-300 "
                >
                  Remember Me
                </Checkbox>

                <Button
                  loading={loading}
                  onClick={handleSubmit}
                  textSize="16px"
                  text="Log in"
                  className="ml-auto mt-16 c-force-padding-y-px c-force-padding-x-px"
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AuthLayout>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Login;
