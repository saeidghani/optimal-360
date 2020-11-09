import React from 'react';
import Layout from './Helper/Layout';
import Progress from '../Common/Progress';
// import peopleIcon from '../../assets/images/people-outline.svg';
const ReferenceGuide = () => {
  const ReferenceGuideCards = [
    {
      title: 'Full grey color:',
      titleValue: 'Survey not started',
      statusText: '',
      percent: '0',
    },
    {
      title: 'Red color:',
      titleValue: 'Survey in progress;',
      statusText: 'Not completed',
      percent: '30',
    },
    {
      title: 'Yellow Color :',
      titleValue: 'Survey in progress;',
      statusText: 'Not fully completed',
      percent: '60',
    },
    {
      title: 'Full dark green color :',
      titleValue: 'Survey fully completed;',
      statusText: 'Not submitted',
      percent: '100',
    },
    {
      title: 'Full dark green color :',
      titleValue: 'Survey fully completed;',
      statusText: 'and submitted',
      percent: 'sub',
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
  return (
    <Layout className=" py-4 px-4 sm:px-6 lg:py-16 lg:px-3 lg:flex">
      <span className="py-4 my-2 text-blue-500">ReferenceGuide</span>
      <span>
        You have been nominated in the multi-rater feedback project: 360-feedback survey. You have
        until 26th February 2020 to complete the survey. Please complete the survey within the
        stipulated time period.
      </span>

      <div className="grid grid-cols-4 gap-6 py-12">
        {ReferenceGuideCards?.map((item, index) => (
          <div
            className="flex flex-col bg-white p-6 rounded-md items-center justify-center"
            key={index}
          >
            <div className="mb-3">
              <span>{item.title}</span>
            </div>
            <div className="mb-3 text-gray-600">
              <span>{item.titleValue}</span>
            </div>
            <div className="mb-3 text-gray-600">
              <span>{item.statusText}</span>
            </div>
            <div className="mb-6 flex justify-center">
              <Progress
                percentage={item.percent === 'sub' ? 100 : item.percent}
                status={item.percent == 'sub' ? 'sub' : 'normal'}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mb-24">
        {rateInformation.map((item, index) => (
          <div className="flex bg-white p-8 my-1 rounded-md items-center" key={index}>
            <span
              className="w-1/9  bg-blue-100 justify-center flex"
              style={{ height: '35px', width: '35px' }}
            >
              {/* <img src={peopleIcon} alt="people icon" /> */}
            </span>
            <span className="w-1/9 px-3">{item.RateCount}</span>
            <span className="w-5/9 px-3">{item.title}</span>
            <div className="grid grid-flex-col w-2/9">
              <span className="grid-rows-12">{item.text}</span>
              <span className="grid-rows-12">{item.exampleText}</span>
            </div>
          </div>
        ))}
        {totalComperestionRateInformation.map((item, index) => (
          <div className="flex bg-white my-1 p-8 rounded-md" key={index}>
            <span className="w-1/5 px-3">{item.title}</span>
            <span className="w-1/5 px-3">
              <Progress type="line" percentage={item.percent} />
            </span>
            <span className=" w-3/5 px-3 ">{item.text}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ReferenceGuide;
