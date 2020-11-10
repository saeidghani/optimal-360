import React from 'react';

import SuccessIcon from '../../../assets/images/success-purple.svg';

import Button from '../../Common/Button';
import AuthLayout from '../Helper/AuthLayout';

const Success = () => (
  <AuthLayout className="grid grid-cols-12 items-center justify-center my-auto pb-8 lg:pb-16">
    <div
      className="bg-white rounded-lg col-start-2 col-span-10 xl:col-start-4 xl:col-span-6 py-8 px-4
       sm:py-16 sm:px-12 lg:px-28 lg:pt-24 lg:pb-28"
    >
      <div className="flex flex-col items-center justify-center">
        <img src={SuccessIcon} alt="purple-check h-32 w-32" />

        <h2 className="mt-8 mb-6 text-4xl font-medium">Success</h2>

        <p className="text-sm font-normal text-center">
          Please check your email inbox, we have sent you a new password in your email.
        </p>

        <Button
          href="/super-user/login"
          className="mt-12 c-force-padding-y-px px-7 w-full sm:w-auto"
          text="Log in"
        />
      </div>
    </div>
  </AuthLayout>
);

export default Success;
