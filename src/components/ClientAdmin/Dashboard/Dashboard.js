import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import Dropdown from '../../Common/Dropdown';
import Layout from '../../Common/ClientAdminLayout';
import { useQuery } from '../../../hooks';

import SurveyGroup from './Helper/SurveyGroup';

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
  const { projectId, surveyGroupId } = parsedQuery || {};

  const { TabPane } = Tabs;

  useEffect(() => {
    fetchProjects('');
  }, []);

  const projectsList = React.useMemo(
    () =>
      (projects?.data || []).map((el) => ({
        title: el.projectName,
        value: el.projectId,
        label: el.projectName,
      })),
    [projects.timeStamp],
  );

  React.useEffect(() => {
    if (!projectId && projectsList?.length > 0) {
      setQuery({ projectId: projectsList[0]?.value });
    }
  }, [projectId, projectsList]);

  const surveyGroups = React.useMemo(
    () =>
      projects?.data?.find((project) => project?.projectId?.toString() === projectId?.toString())
        ?.surveyGroups || [],
    [projects.timeStamp, projectId],
  );

  React.useEffect(() => {
    if (!surveyGroupId && surveyGroups?.length > 0) {
      setQuery({ surveyGroupId: surveyGroups[0]?.surveyGroupId });
    }
  }, [surveyGroups]);

  const projectName = React.useMemo(
    () =>
      projectsList?.find((project) => project.value?.toString() === projectId?.toString())?.title ||
      '',
    [projects.timeStamp, projectId],
  );

  const onTabChange = (key) => {
    setQuery({ surveyGroupId: key, viewBy: '', page_number: '', page_size: '' });
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
          value={projectName}
          handleChange={(val) => setQuery({ projectId: val })}
          options={projectsList}
        />
      </div>
      <Tabs defaultActiveKey={surveyGroupId} onChange={onTabChange}>
        {surveyGroups?.map((group) => (
          <TabPane key={group.surveyGroupId?.toString()} tab={group.surveyGroupName}>
            <SurveyGroup
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
        ))}
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
    data: PropTypes.arrayOf(PropTypes.shape({})),
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
