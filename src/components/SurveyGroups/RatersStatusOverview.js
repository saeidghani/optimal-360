import React from 'react';
// import PropTypes from 'prop-types';
import { TeamOutlined } from '@ant-design/icons';
import MainLayout from '../Common/Layout';
import Dropdown from '../Common/Dropdown';
import Tabs from '../Common/Tabs';
import Progress from '../Common/Progress';

const RatersStatusOverview = () => (
  <MainLayout contentClass="px-6 py-4" title="Super User">
    <div>
      <div className="lg:w-2/12 w-4/12">
        <h2 className="mb-6 pt-6 pl-3 font-medium text-16px">Survey Group</h2>
        <Dropdown type="gray" defaultValue="Top Leadership" />
      </div>
      <div>
        <Tabs className="c-tabs-class" />
      </div>
      <div className="bg-white p-6 pr-32 rounded-7px mb-6">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-medium text-24px">Overall Completion Rate</h1>
          <div className="flex justify-between items-center">
            <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-2px" />
            <span className="font-medium text-24px mr-5">20</span>
            <span className="text-12px text-antgray-100 ">Total Ratee(s)</span>
          </div>
        </div>
        <Progress type="line" percentage="38" />
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="flex flex-col ">
          <div className="bg-white p-6 rounded-7px">
            <div className="mb-3">
              <span className="text-12px">Total Raters: </span>
              <span className="text-16px text-heading">20</span>
            </div>
            <div className="mb-14">
              <span className="text-12px">Total No. Submission: </span>
              <span className="text-16px text-heading">6/20</span>
            </div>
            <div className="mb-6">
              <Progress percentage="38" />
            </div>
            <div>
              <h2 className="text-center">Total Self</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

// RatersStatusOverview.propTypes = {};

// RatersStatusOverview.defaultProps = {};

export default RatersStatusOverview;
