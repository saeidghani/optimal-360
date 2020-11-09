import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';

import Layout from './Helper/Layout';
import Button from '../Common/Button';

const Dashboard = ({ loading }) => {
  const dropdownOptions = [
    { title: 'Leadership Development1', value: 1 },
    { title: 'Leadership Development2', value: 2 },
    { title: 'Leadership Development3', value: 3 },
  ];

  const tabOptions = [
    { title: 'Top Leadership', key: '1' },
    { title: 'Managers', key: '2' },
    { title: 'High Potentials', key: '3' },
  ];

  const viewButtons = [
    { title: 'View Ratee Summary', key: '1' },
    { title: 'View Ratee Details', key: '2' },
    { title: 'View Rater Details', key: '3' },
  ];

  const rateOptions = [
    { key: '1', title: 'View Ratee Summary', raters: '20', submission: '6/20', progress: 30 },
    { key: '2', title: 'View Ratee Details', raters: '20', submission: '6/20', progress: 60 },
    { key: '3', title: 'View Rater Details', raters: '20', submission: '6/20', progress: 30 },
    { key: '4', title: 'View Rater Details', raters: '20', submission: '6/20', progress: 100 },
  ];

  return (
    <Layout>
      <div className="text-left text-heading">Dashboard</div>
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12
          md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          showSearch
          value={1}
          type="gray"
          options={dropdownOptions}
        />
      </div>
      <div className="md:w-full">
        <Tabs className="md:c-tabs-class" defaultActiveKey="1" tabOptions={tabOptions} />
      </div>
      <div className="flex items-center overflow-auto">
        {viewButtons.map((button) => (
          <Button
            key={button.key}
            className="mr-1 bg-white border-list-border shadow-none px-2 md:px-4"
            textClassName="text-heading"
            textSize="sm"
            text={button.title}
          />
        ))}
      </div>
      <div className="flex flex-col bg-white p-6 rounded-md my-6">
        <div className="flex flex-col justify-between items-start mb-5">
          <h1 className="font-medium text-base md:text-2xl">Overall Completion Rate</h1>
          <div className="flex justify-between items-center">
            <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
            <span className="font-medium text-2xl mr-5">20</span>
            <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
          </div>
        </div>
        <Progress type="line" percentage="38" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {rateOptions.map((rate) => (
          <div className="bg-white rounded-md flex flex-col py-8 px-16">
            <div className="mb-3">
              <span className="text-xs">Total Raters: </span>
              <span className="text-base text-heading">{rate.raters}</span>
            </div>
            <div className="mb-14">
              <span className="text-xs">Total No. Submission: </span>
              <span className="text-base text-heading">{rate.submission}</span>
            </div>
            <div className="mb-6 flex justify-center">
              <Progress percentage={rate.progress} />
            </div>
            <div>
              <h2 className="text-center">{rate.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

Dashboard.propTypes = {
  loading: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {};

export default Dashboard;
