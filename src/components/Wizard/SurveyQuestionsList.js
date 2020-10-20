import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined, LineOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import MainLayout from '../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Input from '../Common/Input';
import SecondaryMenu from '../Common/Menu';
import SecondaryButton from '../Common/Button';
import Checkbox from '../Common/Checkbox';
import AddQuestionModal from './Helper/AddQuestionModal';
import AddFeedbackModal from './Helper/AddFeedbackModal';

const SurveyQuestionsList = () => {
  const [questionModal, setquestionModal] = useState(false);
  const [feedbackModal, setfeedbackModal] = useState(false);
  const array = [0, 1, 2, 3, 4];
  const clusters = [1, 2, 3, 4, 5];
  return (
    <>
      <MainLayout title="Super User" contentClass="pt-4" titleClass="pl-6">
        <div className="bg-white w-full flex font-sans">
          <Menu />
          <div className="w-full px-6 pt-6  ">
            <Steps className="w-full" />
            <div className="pr-28">
              <div className="mt-17">
                <h4 className=" text-secondary text-20px mb-8">Rating Scale</h4>
                {array.map((item) => (
                  <div className="mb-6" key={item}>
                    <span className="text-heading">{item}</span>
                    <div className="flex flex-row mt-3">
                      <Input placeholder="Label" inputClass="w-41" wrapperClassName="mr-6" />
                      <Input
                        value="Does not describe the person at all"
                        wrapperClassName="w-full"
                      />
                    </div>
                  </div>
                ))}
                <h4 className=" text-secondary text-20px mt-8.5">Data Model</h4>
              </div>
              <div className="flex flex-row mt-8 mb-7.5 w-full">
                <SecondaryMenu
                  title="ALL"
                  titleClassName="pt-2.3 pb-5.5 pl-7.5 text-body font-medium font-sans"
                  className="mr-6"
                />
                <div className="p-6 rounded-7px border border-antgray-500 w-full">
                  <div className="flex flex-row justify-between bg-antgray-600 h-14 w-full pl-8 py-3 pr-6 items-center border-b border-list-border">
                    <span>All</span>
                    <div className="flex items-center">
                      <Button
                        className="flex items-center mr-3.5"
                        onClick={() => setquestionModal(true)}
                      >
                        <span className="text-12 pr-2">Add Cluster</span>
                        <PlusCircleOutlined />
                      </Button>
                      <Button disabled className="flex items-center">
                        <span className="text-12 pr-2">Export Exel File</span>
                        <PlusCircleOutlined />
                      </Button>
                    </div>
                  </div>
                  {clusters.map((item) => (
                    <div
                      className="flex flex-row justify-between bg-list-bg h-14 w-full pl-8 py-3 pr-6 items-center border-b border-list-border "
                      key={item}
                    >
                      <div className="flex items-center">
                        <button className="flex flex-col">
                          <LineOutlined className="text-primary-500  text-lg" />
                          <LineOutlined className="text-primary-500 text-lg -mt-2" />
                        </button>
                        <span className="ml-8 text-primary-500 text-14px">Cluster 1</span>
                      </div>
                      <div className="flex items-center">
                        <DeleteOutlined className="text-xl text-primary-600 mr-4.5 cursor-pointer" />
                        <EditOutlined className="text-xl text-primary-500 cursor-pointer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className=" bg-antgray-600 rounded-7px w-full pl-8.2 pt-6 pb-5.5 pr-3.5">
                <div className="flex flex-row items-center justify-between mb-6">
                  <h4 className=" text-secondary text-20px   ">Feedbacks</h4>
                  <Button className="flex items-center " onClick={() => setfeedbackModal(true)}>
                    <span className="text-12 pr-2">Add Question</span>
                    <PlusCircleOutlined />
                  </Button>
                </div>

                <div className="flex flex-row items-center">
                  <button className="flex flex-col">
                    <LineOutlined className="text-antgray-100 text-lg" />
                    <LineOutlined className="text-antgray-100 text-lg -mt-2" />
                  </button>
                  <Input value="General" inputClass="w-41" wrapperClassName="mr-6 ml-8.3" />
                  <Input placeholder="Statement" inputClass="pl-10" wrapperClassName="w-full" />
                </div>
                <div className="flex justify-end items-center pt-1.5">
                  <Checkbox labelClass="text-secondary">Required</Checkbox>
                </div>

                <div className="flex flex-row items-center mt-6.5">
                  <button className="flex flex-col">
                    <LineOutlined className="text-antgray-100 text-lg" />
                    <LineOutlined className="text-antgray-100 text-lg -mt-2" />
                  </button>
                  <Input value="General" inputClass="w-41" wrapperClassName="mr-6 ml-8.3" />
                  <Input placeholder="Statement" inputClass="pl-10" wrapperClassName="w-full" />
                </div>
                <div className="flex justify-end items-center pt-1.5">
                  <Checkbox labelClass="text-secondary">Required</Checkbox>
                </div>
              </div>
              <div className="mt-16 pb-22 flex justify-end">
                <SecondaryButton
                  type="link"
                  text="Back"
                  className="text-base w-24.5 h-9.5 flex items-center justify-center"
                />
                <SecondaryButton
                  text="Next"
                  className="text-base w-24.5 h-9.5 flex items-center justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
      <AddQuestionModal visible={questionModal} action={setquestionModal} />
      <AddFeedbackModal visible={feedbackModal} action={setfeedbackModal} />
    </>
  );
};

export default SurveyQuestionsList;
