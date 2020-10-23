import React, { useState } from 'react';
import MainLayout from '../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Button from '../Common/Button';
import TextEditor from '../Common/TextEditor';
import Checkbox from '../Common/Checkbox';


const SurveyIntro = () => {

  const onChangeCheckbox = (event) => {
    console.log("onChangeCheckbox -> event", event)
  }

  return (
    <MainLayout
      hasBreadCrumb
      title="Super User"
      titleClass="mb-2"
      contentClass="py-4"
      headerClassName="pl-21"
      childrenPadding={false}
    >
      <div className="bg-white grid grid-cols-12 pl-15">
        <Menu className="col-span-2" />
        <div className="px-6 py-5 col-start-3 col-span-10  ">
          <Steps currentPosition={4} />
          <div className="flex mt-12 mb-3" >
            <Button text="Individual Report" className="mr-3" />
            <Button text="Group Report" className="" />
          </div>
          <div>
            <div className="flex flex-wrap">
              <div className="bg-gray-100 px-10 py-5 w-full">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Report content:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Competency Results:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Client Competency Model:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Behavior Results:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Raters Information:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Feedback/Comments (Development Areas):</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Feedback/Comments (General):</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Results Overview:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Development Plan:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Competency Level and Awareness:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/2 border-b border-gray-200">
                <Checkbox labelClass="text-secondary" onChange={(event) => onChangeCheckbox(event)}>Notes Page:</Checkbox>
              </div>
              <div className="w-full mt-16 px-10">
                <TextEditor
                  placeholder="Client Competency Model"
                  label="Client Competency Model:"
                />
              </div>

              <p className="w-full mt-12 px-10 text-base font-medium">
                Additional Report Setting:
              </p>

              <div className="px-10 py-5 w-1/4">
                <Checkbox labelClass="text-secondary font-medium" onChange={(event) => onChangeCheckbox(event)}>Include Previous Results Data:</Checkbox>
              </div>
              <div className="px-10 py-5 w-1/4">
                <Checkbox labelClass="text-secondary font-medium" onChange={(event) => onChangeCheckbox(event)}>Include Mission Critical Data:</Checkbox>
              </div>
            </div>

            <div className="pt-23.5 pb-22 flex justify-end pr-33">
              <Button text="Submit" />
            </div>

          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SurveyIntro;
