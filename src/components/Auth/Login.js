import React from 'react';
import { Formik, Form } from 'formik';

import Logo from '../Common/Logo';
// import Form from '../Common/Form';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';
import Button from '../Common/Button';

import Shape from './AnimatedShape';

const Login = () => (
  <div className="min-h-screen bg-white relative flex flex-row items-center justify-center">
    <div className="absolute top-0 left-0 flex flex-row pl-8 md:pl-20 lg:pl-40 pt-6 lg:pt-8">
      <Logo white />
    </div>

    <div className="grid grid-cols-12 gap-x-4x w-full xl:mt-16">
      <div
        className="md:col-span-5 md:col-start-2 xl:col-span-6 xl:col-start-1
       hidden md:flex justify-center items-center"
      >
        <Shape />
      </div>

      <div
        className="col-start-2 col-span-10 md:col-span-4 md:col-start-7 xl:col-start-7 xl:col-span-4
       flex flex-col justify-center items-center px-6"
      >
        <h1 className="font-medium text-3xl w-full block text-left mb-10">Login</h1>
        <Formik
          initialValues={{
            email: '',
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
                name="email"
                wrapperClassName="mb-12"
                labelText="Email"
                placeholder="Email"
              />

              <Input
                onChange={handleChange}
                name="password"
                wrapperClassName="mb-6"
                labelText="Password"
                placeholder="Password"
                extrainfoText="Forgot Password ?"
              />

              <Checkbox onChange={() => {}} className="text-gray-300 ">
                Remember Me
              </Checkbox>

              <Button onClick={handleSubmit} text="Log in" className="ml-auto mt-16 py-4" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  </div>
);

export default Login;
