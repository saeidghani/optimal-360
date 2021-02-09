import React, { Fragment, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import moment from 'moment';

import Progress from '../../../Common/Progress';
import Tooltip from '../../../Common/Tooltip';
import { useQuery } from '../../../../hooks';
import graphIcon from '../../../../assets/images/graph-icon.svg';
import RelationsTable from './RelationsTable';
import { findProgressAvg } from '../../../../lib/SurveyPlatform/questionsUtils';

const SurveyGroup = ({
  loading,
  fetchInfo,
  fetchRelations,
  resetQuestions,
  info,
  relations,
  isSubmitted,
  visitedSurveyGroups,
}) => {
  const [parsedQuery, , setQuery] = useQuery();
  const { surveyGroupId, surveyMode } = parsedQuery || {};

  const { TabPane } = Tabs;

  useEffect(() => {
    if (surveyGroupId) {
      fetchInfo({ surveyGroupId });
    }
  }, [fetchInfo, surveyGroupId]);

  useEffect(() => {
    if (surveyGroupId) {
      fetchRelations({ surveyGroupId });
    }
  }, [fetchRelations, surveyGroupId]);

  const progressAvg = useMemo(() => findProgressAvg(relations?.data), [relations.timeStamp]);

  const surveyModes = useMemo(() => {
    const modes = [];
    if (info?.data?.surveyModeInUserDashboard) {
      // eslint-disable-next-line no-unused-expressions
      Object.keys(info?.data?.surveyModeInUserDashboard)?.forEach((mode) => {
        if (info?.data?.surveyModeInUserDashboard[mode]) {
          const newMode = {};
          switch (mode) {
            case 'allRatees':
              newMode.title = 'All';
              newMode.key = 'all';
              newMode.toolTip = 'Select All if you would like to rate all ratees together';
              break;
            case 'ratingGroup':
              newMode.title = 'Group';
              newMode.key = 'group';
              newMode.toolTip = 'Select Group if you would like to rate people as a group';
              break;
            default:
              newMode.title = 'Individual';
              newMode.key = 'individual';
              newMode.toolTip =
                'Select Individual if you would like to rate each person separately';
          }
          if (newMode.title) modes.push(newMode);
        }
      });
    }
    if (modes.length > 0) setQuery({ surveyMode: modes[0]?.key });
    return modes;
  }, [info.timeStamp]);

  const getRemainingTime = (date) => {
    const eventDate = moment(date);
    const todayDate = moment();
    const leftDays = eventDate.diff(todayDate, 'days');
    const hours = eventDate.diff(todayDate, 'hours');
    const dayHours = hours / 24;
    const leftHours = Math.ceil((dayHours - Math.floor(dayHours)) * 24);
    return { leftDays, leftHours };
  };

  const handleTabChange = (key) => {
    setQuery({ surveyMode: key });
  };

  const deadlineInfo = (
    <div className="flex">
      <span className="text-xs md:text-sm">
        Survey Ends on {moment(info?.data?.endDate).format('D MMM')}
      </span>
      <span className="mx-1 md:mx-3">|</span>
      <div className="text-xs md:text-sm">
        <span className="mr-1 text-purple-500">
          {getRemainingTime(info?.data?.endDate).leftDays}d
        </span>
        <span>and</span>
        <span className="mx-1 text-purple-500">
          {getRemainingTime(info?.data?.endDate).leftHours}h
        </span>
        <span>left</span>
      </div>
    </div>
  );

  const extraDetails = (
    <div className="flex flex-col items-center py-6 md:py-0 md:mt-10">
      <div className="md:hidden">{deadlineInfo}</div>
      <div className="flex items-center">
        <span className="relative w-10 h-10 rounded-full bg-primary-500">
          <img src={graphIcon} className="absolute bottom-0 pb-3 pl-2 w-3/4" alt="" />
        </span>
        <span className="mx-2 text-body text-sm">Status / Action:</span>
        <span className="text-heading text-xl">
          {progressAvg === 0 ? 'Not started' : progressAvg === 100 ? 'Completed' : 'In progress'}
        </span>
      </div>
      <Progress
        className="mt-10"
        percentage={progressAvg}
        subClassName="text-heading"
        status={isSubmitted ? 'sub' : ''}
        showPercent
      />
      <div className="mt-10 text-antgray-100">Collective Completion Rate</div>
    </div>
  );

  const SubmittedMsg = () => (
    <div className="flex flex-col p-4 h-48">
      <h1 className="text-2xl">Attention!</h1>
      <p className="mt-3">
        You have already submitted this survey group and you are not able to see or change its
        details
      </p>
    </div>
  );

  return (
    <div className="w-full p-8 md:bg-white md:shadow mt-8 md:mt-0">
      {isSubmitted ? (
        <SubmittedMsg />
      ) : (
        <Fragment>
          <div className="flex flex-col bg-white rounded-lg shadow mb-4 md:hidden">
            {extraDetails}
          </div>
          <Tabs
            className="survey-mode-tabs bg-white p-2"
            tabBarExtraContent={
              !isSubmitted ? <div className="hidden md:block">{deadlineInfo}</div> : null
            }
            defaultActiveKey={surveyMode}
            activeKey={surveyMode}
            onChange={handleTabChange}
          >
            {surveyModes?.map((mode) => (
              <Tooltip title={mode.toolTip}>
                <TabPane tab={mode?.title} key={mode?.key}>
                  <RelationsTable
                    loading={loading}
                    relations={relations}
                    isSubmitted={isSubmitted}
                    visitedSurveyGroups={visitedSurveyGroups}
                    resetQuestions={resetQuestions}
                    className={`${
                      mode?.key === 'all'
                        ? 'md:grid grid-cols-8 md:mt-0'
                        : 'pt-4 mt-8 md:mt-0 md:pt-6 bg-white rounded-lg shadow overflow-auto'
                    }`}
                    tableClassName={`${
                      mode?.key === 'all' ? 'col-span-5 overflow-auto' : 'overflow-auto'
                    }`}
                    extraDetailsClassName={`${
                      mode?.key === 'all' ? 'row-start-1 col-start-6 col-span-3' : ''
                    }`}
                    extraDetails={
                      mode?.key === 'all' ? (
                        <div className="hidden md:block">{extraDetails}</div>
                      ) : null
                    }
                  />
                </TabPane>
              </Tooltip>
            ))}
          </Tabs>
        </Fragment>
      )}
    </div>
  );
};

SurveyGroup.propTypes = {
  loading: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool,
  fetchInfo: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  resetQuestions: PropTypes.func.isRequired,
  visitedSurveyGroups: PropTypes.arrayOf(PropTypes.shape({})),
  info: PropTypes.shape({
    data: PropTypes.shape({
      endDate: PropTypes.string,
      surveyModeInUserDashboard: PropTypes.shape({}),
    }),
    timeStamp: PropTypes.number,
  }),
  relations: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    timeStamp: PropTypes.number,
  }),
};

SurveyGroup.defaultProps = {
  info: {},
  relations: {},
  isSubmitted: false,
  visitedSurveyGroups: [{}],
};

export default SurveyGroup;
