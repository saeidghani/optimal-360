import React from 'react';
import { Formik, Form } from 'formik';

import Logo from '../Common/Logo';
// import Form from '../Common/Form';
import Input from '../Common/Input';
import Checkbox from '../Common/Checkbox';
import Button from '../Common/Button';

import Shape from './AnimatedShape';

const Login = (props) => (
  <div className="min-h-screen">
    <div className="flex flex-row pl-8 md:pl-20 lg:pl-40 pt-6 lg:pt-8">
      <Logo />
    </div>

    <div className="grid grid-cols-12 gap-x-4 mt-16">
      <div className="col-span-6 flex justify-center items-center">
        <Shape />
      </div>

      <div className="col-start-8 col-span-3 flex flex-col justify-center items-center px-6">
        {/* <Form test="XXX" /> */}

        <h1 className="font-medium text-2xl w-full block text-left mb-10">Login</h1>
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
            <Input labelText="Email" placeholder="Email" />

            <Input labelText="Password" placeholder="Password" extrainfoText="Forgot Password ?" />

            <div className="flex flex-row my-4">
              <Checkbox />

              <p className="ml-2 text-gray-300">Remember Me</p>
            </div>

            <Button>Log in</Button>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
);

export default Login;
