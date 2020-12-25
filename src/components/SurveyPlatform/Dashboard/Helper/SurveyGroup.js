import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import moment from 'moment';

import Progress from '../../../Common/Progress';
import { useQuery } from '../../../../hooks';
import graphIcon from '../../../../assets/images/graph-icon.svg';
import DataTable from './DataTable';

const SurveyGroup = ({
  loading,
  fetchInfo,
  fetchRelations,
  info,
  relations,
  isSubmitted,
  surveyGroupSubmited,
  visitedSurveyGroups,
}) => {
  const [parsedQuery, , setQuery] = useQuery();
  const { surveyGroupId, surveyMode } = parsedQuery || {};

  const { TabPane } = Tabs;

  React.useEffect(() => {
    if (surveyGroupId) fetchInfo({ surveyGroupId });
  }, [fetchInfo, surveyGroupId]);

  React.useEffect(() => {
    if (surveyGroupId) fetchRelations({ surveyGroupId });
  }, [fetchRelations, surveyGroupId]);

  const totalAvg = React.useMemo(() => {
    const avgs = [];
    // eslint-disable-next-line no-unused-expressions
    relations?.data?.forEach((item) => {
      const avg = parseInt((item.totalAnswers / item.totalQuestions) * 100, 10);
      avgs.push(avg);
    });
    let result = 0;
    if (avgs?.length > 0) {
      const avgsSum = avgs.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      result = parseInt(avgsSum / avgs.length, 10) || 0;
    }
    return result;
  }, [relations.timeStamp]);

  const onTabChange = (key) => {
    setQuery({ surveyMode: key });
  };

  const surveyModes = React.useMemo(() => {
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
              break;
            case 'ratingGroup':
              newMode.title = 'Group';
              newMode.key = 'group';
              break;
            default:
              newMode.title = 'Individual';
              newMode.key = 'individual';
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
    <div className="flex flex-col items-center mt-10">
      <div className="md:hidden">{deadlineInfo}</div>
      <div className="flex items-center">
        <span className="relative w-10 h-10 rounded-full bg-primary-500">
          <img src={graphIcon} className="absolute bottom-0 pb-3 pl-2 w-3/4" alt="" />
        </span>
        <span className="mx-2 text-body text-sm">Status / Action:</span>
        <span className="text-heading text-xl">
          {totalAvg === 0 ? 'Not started' : totalAvg === 100 ? 'Completed' : 'In progress'}
        </span>
      </div>
      <Progress
        className="mt-10"
        percentage={totalAvg}
        subClassName="text-heading"
        status={isSubmitted || surveyGroupSubmited ? 'sub' : ''}
        showPercent
      />
      <div className="mt-10 text-antgray-100">Collective Completion Rate</div>
    </div>
  );

  return (
    <div className="w-full p-8 bg-white shadow mt-8 md:mt-0">
      <Tabs
        className="survey-mode-tabs"
        tabBarExtraContent={deadlineInfo}
        defaultActiveKey={surveyMode}
        activeKey={surveyMode}
        onChange={onTabChange}
      >
        {surveyModes?.map((mode) => (
          <TabPane tab={mode?.title} key={mode?.key}>
            <DataTable
              loading={loading}
              relations={relations}
              isSubmitted={isSubmitted}
              surveyGroupSubmited={surveyGroupSubmited}
              visitedSurveyGroups={visitedSurveyGroups}
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
                mode?.key === 'all' ? <div className="hidden md:block">{extraDetails}</div> : null
              }
            />
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

SurveyGroup.propTypes = {
  loading: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool,
  surveyGroupSubmited: PropTypes.bool,
  fetchInfo: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
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
  surveyGroupSubmited: false,
};

export default SurveyGroup;
