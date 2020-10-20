import React from 'react';

import SuccessIcon from '../../assets/images/success-purple.svg';

import Button from '../Common/Button';
import Layout from './Helper/Layout';

const Success = () => (
  <Layout>
    <div className="flex flex-col text-center justify-center items-center">
      <img src={SuccessIcon} alt="purple-check h-32 w-32" />

      <h2 className="mt-8 mb-6 text-4xl font-medium">Success</h2>

      <p className="text-sm font-normal">
        Please check your email inbox, we have sent you a new password in your email.
      </p>

      <Button href="/login" className="mt-12 c-force-padding-y-px px-7" text="Log in" />
    </div>
  </Layout>
);

export default Success;
