import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import DataTable from './Helper/DataTable';
import { useQuery } from '../../../hooks';
import graphIcon from '../../../assets/images/graph-icon.svg';
import Progress from '../../Common/Progress';

const Managers = ({
  loading,
  fetchProjects,
  fetchInfo,
  fetchRelations,
  fetchQuestions,
  fetchFeedbacks,
  postQuestionResponses,
  postFeedbackResponses,
  projects,
  info,
  relations,
  questions,
  feedbacks,
}) => {
  const [parsedQuery, , setQuery] = useQuery();
  const { surveyMode } = parsedQuery || {};

  const { TabPane } = Tabs;

  const onTabChange = (key) => {
    setQuery({ surveyMode: key });
  };

  const deadlineInfo = (
    <div className="flex">
      <span className="text-xs md:text-sm">Survey Ends on 28 Sep</span>
      <span className="mx-1 md:mx-3">|</span>
      <div className="text-xs md:text-sm">
        <span className="mr-1 text-purple-500">29d</span>
        <span>and</span>
        <span className="mx-1 text-purple-500">2h</span>
        <span>left</span>
      </div>
    </div>
  );

  const extraDetails = (
    <div className="flex flex-col items-center mt-6">
      <div className="md:hidden">{deadlineInfo}</div>
      <div className="flex items-center mt-10 md:mt-20">
        <span className="relative w-10 h-10 rounded-full bg-primary-500">
          <img src={graphIcon} className="absolute bottom-0 pb-3 pl-2 w-3/4" alt="" />
        </span>
        <span className="mx-2 text-body text-sm">extraDetails</span>
        <span className="text-heading text-xl">In progress</span>
      </div>
      <Progress className="mt-10" percentage={20} subClassName="text-heading" showPercent />
      <div className="mt-10 text-antgray-100">Collective Completion Rate</div>
    </div>
  );

  return (
    <div className="w-full p-8 bg-white shadow mt-8 md:mt-0">
      <Tabs
        className="main-tabs"
        tabBarExtraContent={deadlineInfo}
        defaultActiveKey={surveyMode}
        onChange={onTabChange}
      >
        <TabPane tab="Individual" key="individual">
          <DataTable
            loading={loading}
            fetchProjects={fetchProjects}
            fetchInfo={fetchInfo}
            fetchRelations={fetchRelations}
            fetchQuestions={fetchQuestions}
            fetchFeedbacks={fetchFeedbacks}
            postQuestionResponses={postQuestionResponses}
            postFeedbackResponses={postFeedbackResponses}
            projects={projects}
            info={info}
            relations={relations}
            questions={questions}
            feedbacks={feedbacks}
            className="pt-4 mt-8 md:mt-0 md:pt-6 bg-white rounded-lg shadow"
          />
        </TabPane>
        <TabPane tab="Group" key="group">
          <DataTable
            loading={loading}
            fetchProjects={fetchProjects}
            fetchInfo={fetchInfo}
            fetchRelations={fetchRelations}
            fetchQuestions={fetchQuestions}
            fetchFeedbacks={fetchFeedbacks}
            postQuestionResponses={postQuestionResponses}
            postFeedbackResponses={postFeedbackResponses}
            projects={projects}
            info={info}
            relations={relations}
            questions={questions}
            feedbacks={feedbacks}
            className="pt-4 mt-8 md:mt-0 md:pt-6 bg-white rounded-lg shadow"
          />
        </TabPane>
        <TabPane tab="All" key="all">
          <DataTable
            loading={loading}
            fetchProjects={fetchProjects}
            fetchInfo={fetchInfo}
            fetchRelations={fetchRelations}
            fetchQuestions={fetchQuestions}
            fetchFeedbacks={fetchFeedbacks}
            postQuestionResponses={postQuestionResponses}
            postFeedbackResponses={postFeedbackResponses}
            projects={projects}
            info={info}
            relations={relations}
            questions={questions}
            feedbacks={feedbacks}
            className="md:grid grid-cols-8 md:mt-0"
            tableClassName="col-span-5"
            extraDetailsClassName="row-start-1 col-start-6 col-span-3"
            extraDetails={<div className="hidden md:block">{extraDetails}</div>}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

Managers.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchProjects: PropTypes.func.isRequired,
  fetchInfo: PropTypes.func.isRequired,
  fetchRelations: PropTypes.func.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  fetchFeedbacks: PropTypes.func.isRequired,
  postQuestionResponses: PropTypes.func.isRequired,
  postFeedbackResponses: PropTypes.func.isRequired,
  projects: PropTypes.shape({
    data: PropTypes.shape({
      length: PropTypes.number,
    }),
    timeStamp: PropTypes.number,
  }),
  info: PropTypes.shape({}),
  relations: PropTypes.shape({}),
  questions: PropTypes.shape({}),
  feedbacks: PropTypes.shape({}),
};

Managers.defaultProps = {
  projects: {},
  info: {},
  relations: {},
  questions: {},
  feedbacks: {},
};

export default Managers;
