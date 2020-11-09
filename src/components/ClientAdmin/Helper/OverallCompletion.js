import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Progress from '../../Common/Progress';

const OverallCompletion = () => {
  return (
    <div className="flex flex-col bg-white p-6 rounded-md my-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-5">
        <h1 className="font-medium text-base md:text-2xl mb-3 md:mb-0">Overall Completion Rate</h1>
        <div className="flex justify-between items-center">
          <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
          <span className="font-medium text-2xl mr-5">20</span>
          <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
        </div>
      </div>
      <Progress type="line" percentage="38" />
    </div>
  );
};

OverallCompletion.propTypes = {};

OverallCompletion.defaultProps = {};

export default OverallCompletion;
