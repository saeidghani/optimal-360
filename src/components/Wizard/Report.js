import React, { useState } from 'react';
import MainLayout from '../Common/Layout';
import Menu from './Helper/Menu';
import Steps from '../Common/Steps';
import Button from '../Common/Button';
import TextEditor from '../Common/TextEditor';
import Checkbox from '../Common/Checkbox';

const SurveyIntro = () => {
  const initialReportList = [
    {
      id: 1,
      lable: 'Report content:',
      isChecked: false,
    },
    {
      id: 2,
      lable: 'Competency Results:',
      isChecked: false,
    },
    {
      id: 3,
      lable: 'Client Competency Model:',
      isChecked: false,
    },
    {
      id: 4,
      lable: 'Behavior Results:',
      isChecked: false,
    },
    {
      id: 5,
      lable: 'Raters Information:',
      isChecked: false,
    },
    {
      id: 6,
      lable: 'Feedback/Comments (Development Areas):',
      isChecked: false,
    },
    {
      id: 7,
      lable: 'Feedback/Comments (General):',
      isChecked: false,
    },
    {
      id: 8,
      lable: 'Results Overview:',
      isChecked: false,
    },
    {
      id: 9,
      lable: 'Development Plan:',
      isChecked: false,
    },
    {
      id: 10,
      lable: 'Competency Level and Awareness:',
      isChecked: false,
    },
    {
      id: 11,
      lable: 'Notes Page:',
      isChecked: false,
    },
    {
      id: 12,
      lable: 'Include Previous Results Data:',
      isChecked: false,
    },
    {
      id: 13,
      lable: 'Include Mission Critical Data:',
      isChecked: false,
    },
  ];
  const [reportList, setReportList] = useState(initialReportList);

  const onChangeCheckbox = (id, val) => {
    const newTeportList = [...reportList];
    newTeportList.map((x) => (x.id === id) && (x.isChecked = val));
    setReportList(newTeportList);
  };

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
          <div className="flex mt-12 mb-3">
            <Button text="Individual Report" className="mr-3" />
            <Button text="Group Report" className="" />
          </div>
          <div>
            <div className="flex flex-wrap">
              {reportList.map((item) => (
                item.id < 12 &&
                (
                  <div className="px-10 py-5 w-1/2 border-b border-gray-200" key={item.id}>
                    <Checkbox
                      labelClass="text-secondary"
                      onChange={(value) => onChangeCheckbox(item.id, value)}
                      checked={item.isChecked}
                    >
                      {item.lable}
                    </Checkbox>
                  </div>
                )
              ))}

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
                <Checkbox
                  labelClass="text-secondary font-medium"
                  onChange={(value) => onChangeCheckbox(reportList[11].id, value)}
                  checked={reportList[11].isChecked}
                >
                  {reportList[11].lable}
                </Checkbox>
              </div>
              <div className="px-10 py-5 w-1/4">
                <Checkbox
                  labelClass="text-secondary font-medium"
                  onChange={(value) => onChangeCheckbox(reportList[12].id, value)}
                  checked={reportList[12].isChecked}
                >
                  {reportList[12].lable}
                </Checkbox>
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
