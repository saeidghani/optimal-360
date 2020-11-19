import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import Dropdown from '../../Common/Dropdown';
import { useQuery } from '../../../hooks';

import Layout from './Helper/Layout';
import TopLeadership from './TopLeadership';
import Managers from './Managers';
import HighPotentials from './HighPotentials';

const Dashboard = ({
  loading,
  projects,
  completionRate,
  summary,
  ratees,
  raters,
  fetchProjects,
  fetchCompletionRate,
  fetchSummary,
  fetchRatees,
  fetchRaters,
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
      <Tabs defaultActiveKey={tab} onChange={onTabChange}>
        <TabPane tab="Top Leadership" key="top-leadership">
          <TopLeadership
            loading={loading}
            projects={projects}
            completionRate={completionRate}
            summary={summary}
            ratees={ratees}
            raters={raters}
            fetchCompletionRate={fetchCompletionRate}
            fetchSummary={fetchSummary}
            fetchRatees={fetchRatees}
            fetchRaters={fetchRaters}
          />
        </TabPane>
        <TabPane tab="Managers" key="managers">
          <Managers />
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
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchSummary: PropTypes.func.isRequired,
  fetchRatees: PropTypes.func.isRequired,
  fetchRaters: PropTypes.func.isRequired,
  projects: PropTypes.shape({
    data: PropTypes.shape({
      length: PropTypes.number,
    }),
    timeStamp: PropTypes.number,
  }),
  completionRate: PropTypes.shape({
    totalRatees: PropTypes.string,
    totalSurveySubmissionRate: PropTypes.string,
    totalSurveyRate: PropTypes.string,
    totalAnsweredRate: PropTypes.string,
    totalQuestionRate: PropTypes.string,
    raterGroups: PropTypes.arrayOf(
      PropTypes.shape({
        totalRaters: PropTypes.string.isRequired,
        totalSubmissions: PropTypes.string.isRequired,
        totalQuestions: PropTypes.string.isRequired,
        totalAnswered: PropTypes.string.isRequired,
        raterGroupName: PropTypes.string.isRequired,
      }),
    ),
  }),
  summary: PropTypes.shape({}),
  ratees: PropTypes.shape({}),
  raters: PropTypes.shape({}),
};

Dashboard.defaultProps = {
  completionRate: {},
  projects: {},
  summary: {},
  ratees: {},
  raters: {},
};

export default Dashboard;
