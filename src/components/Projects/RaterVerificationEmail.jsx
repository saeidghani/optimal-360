import React from 'react';
import MainLayout from '../Common/Layout';
import Button from '../Common/Button';

const RaterVerificationEmail = () => {
  return (
    <MainLayout title="Super User" contentClass="pt-4" titleClass="pl-6">
      <div className="bg-white w-full flex font-sans ">
        <div className="w-full pt-12 px-6.5 ">
          <span className="text-secondary text-20px ">Rater verification email</span>
          <div className="mt-2.5 flex flex-row justify-between items-center">
            <div className="flex">
              <Button
                text="Project Name"
                className="text-base px-3 h-8 flex items-center justify-center mr-3 rounded-2px"
              />
              <Button
                text="Rater"
                className="text-base w-16 h-8 flex items-center justify-center mr-3 rounded-2px"
              />
              <Button
                text="Sender"
                className="text-base w-19 h-8 flex items-center justify-center rounded-2px"
              />
            </div>
            <div className=" flex">
              <Button
                type="link"
                text="Cancel"
                className="text-base w-24.5 h-9.5 flex items-center justify-center"
              />
              <Button
                text="Save"
                className="text-base w-24.5 h-9.5 flex items-center justify-center rounded-2px"
              />
            </div>
          </div>
          <div className="h-94 w-full bg-template rounded-7px  mt-12">sd</div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RaterVerificationEmail;
