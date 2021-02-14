import React from 'react';
import { CopyrightCircleOutlined } from '@ant-design/icons';
import { PropTypes } from 'prop-types';
import * as yup from 'yup';
import { Formik, Form } from 'formik';

import { map } from '../../../routes/RouteMap';

import Input from '../../Common/Input';
import Checkbox from '../../Common/Checkbox';
import Button from '../../Common/Button';

import Shape from './Helper/AnimatedShape';
import optimal360Logo from '../../../assets/images/optimal-360-logo.svg';

const Login = ({ login, loading }) => {
  const schema = yup.object({
    email: yup.string().email('email is not valid').required('email field is required'),
    password: yup
      .string()
      .min(8, 'password must  be at least 8 characters long')
      .required('password field is required'),
  });

  return (
    <div className="min-h-screen bg-white relative flex flex-row items-center justify-center">
      <div className="absolute top-0 left-0 flex flex-row pl-8 pt-6 md:pl-20 lg:pl-32 lg:pt-8">
        <img src={optimal360Logo} className="w-40" alt="" />
      </div>
      <div className="grid grid-cols-12 gap-x-4x w-full xl:mt-16">
        <div
          className="md:col-span-5 md:col-start-2 xl:col-span-6 xl:col-start-1
       hidden md:flex justify-center items-start flex-col"
        >
          <div className="pl-32 mt-4 text-blue">
            <p className="text-2xl  font-medium">DEVELOPING LEADERS . OPTIMISING PERFORMANCE</p>
            <Shape className="pt-4" />
            <div className="flex place-items-center">
              <CopyrightCircleOutlined className="mr-2" />
              <p className="text-sm font-normal">
                2020 Optimal Consulting Group Pte. Ltd. All Rights Reserved
              </p>
            </div>
          </div>
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
                  value={values.password}
                  disabled={loading}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  wrapperClassName="mb-4"
                  inputClass="ant-input-lg"
                  labelText="Password"
                  placeholder="Password"
                  extrainfoText="Forgot Password?"
                  extrainfoLink={map.superUser.forgotPassword}
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
                  textSize="base"
                  text="Log in"
                  className="ml-auto mt-16 c-force-padding-y-px c-force-padding-x-px"
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
  loading: PropTypes.bool.isRequired,
};

export default Login;
