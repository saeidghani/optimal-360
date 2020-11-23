import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import Dropdown from '../../Common/Dropdown';
import { useQuery } from '../../../hooks';

import Layout from '../Helper/Layout';
import TopLeadership from './TopLeadership';
import Managers from './Managers';
import HighPotentials from './HighPotentials';

const Dashboard = ({
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
  const { surveyGroupId, tab } = parsedQuery || {};

  const { TabPane } = Tabs;

  useEffect(() => {
    fetchProjects('');
  }, []);

  const surveyGroups = React.useMemo(
    () =>
      ((projects?.data?.length > 0 && projects.data[0].surveyGroups) || []).map((el) => ({
        title: el.surveyGroupName,
        value: el.surveyGroupId,
        label: el.surveyGroupName,
      })),
    [projects.timeStamp],
  );

  const surveyGroupName =
    surveyGroups?.find((group) => group.value?.toString() === surveyGroupId?.toString())?.title ||
    '';

  const onTabChange = (key) => {
    setQuery({ tab: key });
  };

  return (
    <Layout>
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12
          md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          showSearch={false}
          type="gray"
          placeholder="Leadership Development"
          value={surveyGroupName}
          handleChange={(val) => setQuery({ surveyGroupId: val })}
          options={surveyGroups}
        />
      </div>
      <Tabs className="button-tabs" defaultActiveKey="managers" onChange={onTabChange}>
        <TabPane tab="Top Leadership" key="top-leadership">
          <TopLeadership />
        </TabPane>
        <TabPane tab="Managers" key="managers">
          <Managers
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
          />
        </TabPane>
        <TabPane tab="High Potentials" key="high-potentials">
          <HighPotentials />
        </TabPane>
      </Tabs>
    </Layout>
  );
};

Dashboard.propTypes = {
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

Dashboard.defaultProps = {
  projects: {},
  info: {},
  relations: {},
  questions: {},
  feedbacks: {},
};

export default Dashboard;
