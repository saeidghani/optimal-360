import React from 'react';
import { TeamOutlined } from '@ant-design/icons';

import Progress from '../Common/Progress';
import Button from '../Common/Button';

import { dynamicMap } from '../../routes/RouteMap';

import Layout from './Dashboard/Helper/Layout';

const ReferenceGuide = () => {
  const ReferenceGuideCards = [
    {
      title: 'Full grey color:',
      description: 'Survey not started',
      statusText: '',
      progress: 0,
    },
    {
      title: 'Red color:',
      description: 'Survey in progress;',
      statusText: 'Not completed',
      progress: 30,
    },
    {
      title: 'Yellow Color :',
      description: 'Survey in progress;',
      statusText: 'Not fully completed',
      progress: 60,
    },
    {
      title: 'Full dark green color :',
      description: 'Survey fully completed;',
      statusText: 'Not submitted',
      progress: 100,
    },
    {
      title: 'Full dark green color :',
      description: 'Survey fully completed;',
      statusText: 'and submitted',
      progress: 'sub',
    },
  ];
  const rateInformation = [
    {
      RateCount: 20,
      title: 'Total Ratee(s)',
      text: 'Number of submission over the total number in the respective rater group',
      exampleText:
        'E.g.: 0/20 here refers to 0 people out of 20 people from the group Total Self ' +
        'has submitted their surveys',
    },
    {
      RateCount: 20,
      title: 'Total Ratee(s)',
      text: 'Number of people in the respective set',
      exampleText: '',
    },
  ];
  const totalComperestionRateInformation = [
    {
      title: 'Total Completion Rate',
      percent: 30,
      text: 'Total rate of completion by this participant’s raters',
    },
    {
      title: 'Overall Completion Rate',
      percent: 30,
      text: 'Rate of completion for the respective set',
    },
  ];

  const rateOptions = [
    { key: '1', title: 'Self ', description: '', progress: 30 },
    { key: '2', title: 'Manager ', description: 'Premala Jagana', progress: 60 },
    { key: '3', title: 'Peers ', description: 'Katherine Kan', progress: 30 },
    { key: '4', title: 'Direct Reports', description: 'Karyn Chow', progress: 100 },
    {
      key: '5',
      title: 'Others ',
      description: 'Katherine Kan',
      progress: 100,
    },
  ];

  return (
    <Layout heading="Reference Guide">
      <span className="mt-10 text-primary-500 text-base font-semibold">Reference Guide</span>
      <p className="text-antgray-100 mt-4">
        You have been nominated in the multi-rater feedback project: 360-feedback survey. You have
        until 26th February 2020 to complete the survey. Please complete the survey within the
        stipulated time period.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 mt-10">
        {ReferenceGuideCards.map((rate) => (
          <div
            className="bg-white rounded-md flex flex-col items-center
          md:items-start py-8 px-4 lg:px-6 xl:px-10"
          >
            <div className="text-base mb-3">{rate.title}</div>
            <div className="text-sm mb-14 text-antgray-100">{rate.description}</div>
            <div className="mb-6 flex justify-center self-center">
              <Progress
                percentage={rate.progress === 'sub' ? 100 : rate.progress}
                status={rate.progress}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col bg-white py-6 mt-12">
        {rateInformation.map((item) => (
          <div
            className="grid grid-cols-1 md:grid-cols-12 gap-x-20 px-8 border-b border-solid border-gray-400
          py-4 md:flex-row justify-between items-start"
          >
            <div className="col-span-1 md:col-span-2 flex md:justify-between items-center">
              <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
              <span className="font-medium text-2xl mr-5">{item.RateCount}</span>
              <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
            </div>
            <div className="col-span-1 md:col-span-10 flex flex-col items-start my-auto">
              <p className="">{item.text}</p>
              <p className="">{item.exampleText}</p>
            </div>
          </div>
        ))}
        {totalComperestionRateInformation.map((item, index) => (
          <div
            className={`w-full grid grid-cols-1 md:grid-cols-12 px-8 pb-4 bg-white my-auto py-6
            ${
              totalComperestionRateInformation.length - 1 === index
                ? ''
                : 'border-b border-solid border-gray-400'
            }
            `}
            key={index}
          >
            <span className="text-antgray-100 md:col-span-2">{item.title}</span>
            <div className="w-56 pr-12 mt-2 md:col-span-2 md:mt-0">
              <Progress type="line" percentage={item.percent} />
            </div>
            <span className="mt-2 md:col-span-4 md:mt-0">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 mt-10 gap-10">
        <div className="md:col-span-2 bg-white py-6 px-12 rounded-md">
          <div className="grid grid-cols-6 overflow-auto mt-4">
            <div
              className="mb-4 sm:mr-0 mr-4 col-start-2 col-span-4
            border border-solid border-gray-500 text-center py-2 px-2 bg-white w-full"
            >
              View Ratee Summary
            </div>
            <div
              className="mb-4 sm:mr-0 mr-4 col-start-2 col-span-4
            border border-solid border-gray-500 text-center py-2 px-2 bg-white w-full"
            >
              View Ratee Details
            </div>
            <div
              className="mb-4 sm:mr-0 mr-4 col-start-2 col-span-4 text-center py-2 px-2
            text-white bg-primary-500 w-full"
            >
              View Rater Details
            </div>
          </div>
          <p className="mt-4 text-center md:text-left">
            Go to the Main Dashboard (Overview) Also to move between Competency sets using these
            tabs
          </p>
        </div>
        <div className="md:col-span-4 bg-white p-4 md:p-8 rounded-md">
          <span className="text-base pl-4">Participant’s raters’ group</span>
          <div className="bubble-talk grid md:grid-cols-5 gap-x-6 md:gap-x-10 mt-8">
            <div
              className="hidden bubble bubble-top mb-10 ml-32
             col-start-3 col-span-2 md:block"
            >
              Minimum number of submissions required by the rater group for report production where
              applicable
            </div>
            {rateOptions.map((option, index) => (
              <div
                className={`row-start-${index + 1} md:row-start-2 md:col-span-1
              inline-flex flex-col justify-between items-center`}
              >
                <span className="text-antgray-100">{option.title}</span>
                <div className="w-16 h-16 mt-8">
                  <Progress
                    subClassName="pb-12 mb-2"
                    percentage={option.progress}
                    key={option.key}
                  />
                </div>
                <p className="mt-6">{option.description}</p>
              </div>
            ))}
            <div
              className="hidden w-4/5 md:block bubble bubble-bottom col-start-1 col-span-2 mt-8 mr-24"
              style={{ transform: 'rotate(180deg)' }}
            >
              <p style={{ transform: 'rotate(180deg)' }}>Names of participants raters!!!</p>
            </div>

            <div className="block bubble bubble-right row-start-2 h-20 md:mb-6 md:hidden">
              Names of participants raters
            </div>
            <div
              className="block bubble bubble-right row-start-5
            md:hidden md:col-start-4 md:col-span-2 md:mb-6"
            >
              Minimum number of submissions required by the rater group for report production where
              applicable
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8 md:mt-16">
        <Button
          className="c-force-padding-y-px"
          textSize="sm"
          text="Ok, Got it!"
          href={dynamicMap.clientAdmin.dashboard()}
        />
      </div>
    </Layout>
  );
};

export default ReferenceGuide;
