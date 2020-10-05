import React from 'react';
import MainLayout from '../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Button from '../Common/Button';

const SurveyIntro = () => {
  return (
    <MainLayout title="Super User" contentClass="pt-4" titleClass="pl-6">
      <div className="bg-white w-full flex font-sans ">
        <Menu />
        <div className="w-full px-6 pt-6  ">
          <Steps className="w-full" />
          <div className="mt-13 flex flex-row items-center">
            <span className=" ml-8 mr-3 text-body  text-base">Client picture</span>
            <Button
              text="Upload"
              className="bg-white rounded-2px text-primary-500 border-primary-500 text-base font-normal box-border"
            />
          </div>
          <div className=" mt-18 pr-28">
            <span className="text-body text-base">Client Welcome Message</span>
            <div className="mt-3.5 bg-template rounded-7px w-full h-53 mb-18">sd</div>
            <span className="text-body text-base ">Survey Message</span>
            <div className="mt-3.5 bg-template rounded-7px w-full h-53">sd</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveyIntro;
