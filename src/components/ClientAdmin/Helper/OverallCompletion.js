import React from 'react';
import { TeamOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import Progress from '../../Common/Progress';

const OverallCompletion = ({
  totalRatees,
  totalSurveySubmissionRate,
  totalSurveyRate,
  totalAnsweredRate,
  totalQuestionRate,
}) => {
  const surveySubmissionAvg =
    parseInt((totalSurveySubmissionRate / totalSurveyRate) * 100, 10) || 0;
  const questionAnsweredAvg = parseInt((totalAnsweredRate / totalQuestionRate) * 100, 10) || 0;

  return (
    <div className="">
      <div className="flex flex-col bg-white p-6 rounded-md mt-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-5">
          <h1 className="font-medium text-base md:text-2xl mb-3 md:mb-0">
            Overall Survey Submission Rate
          </h1>
          <div className="flex">
            <div className="flex justify-between items-center md:mr-16">
              <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
              <span className="font-medium text-2xl mr-5">{totalRatees}</span>
              <span className="text-xs text-antgray-100 ">Total Rater(s)</span>
            </div>
            <div className="flex justify-between items-center">
              <TeamOutlined className="bg-primary-100 p-2 text-primary-500 mr-5 rounded-sm" />
              <span className="font-medium text-2xl mr-5">{totalRatees}</span>
              <span className="text-xs text-antgray-100 ">Total Ratee(s)</span>
            </div>
          </div>
        </div>
        <Progress type="line" subClassName="text-black" percentage={surveySubmissionAvg} />
      </div>
      <div className="flex flex-col bg-white p-6 rounded-md mt-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-5">
          <h1 className="font-medium text-base md:text-2xl mb-3 md:mb-0">
            Overall Question Answered Rate
          </h1>
        </div>
        <Progress type="line" subClassName="text-black" percentage={questionAnsweredAvg} />
      </div>
    </div>
  );
};

OverallCompletion.propTypes = {
  totalRatees: PropTypes.string.isRequired,
  totalSurveySubmissionRate: PropTypes.string.isRequired,
  totalSurveyRate: PropTypes.string.isRequired,
  totalAnsweredRate: PropTypes.string.isRequired,
  totalQuestionRate: PropTypes.string.isRequired,
};

OverallCompletion.defaultProps = {};

export default OverallCompletion;
