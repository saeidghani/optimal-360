import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import PropTypes from 'prop-types';

import Loading from '../../Common/Loading';
import Dropdown from '../../Common/Dropdown';
import { useQuery } from '../../../hooks';

import Layout from './Helper/Layout';
import TopLeadership from './TopLeadership/TopLeadership';
import Managers from './Managers/Managers';
import HighPotentials from './HighPotentials/HighPotentials';

const Dashboard = ({ loading, completionRate, fetchProjects, projects, fetchCompletionRate }) => {
  const [, , setQuery] = useQuery();

  const { TabPane } = Tabs;

  useEffect(() => {
    fetchProjects('');
  }, []);

  const dropdownOptions = React.useMemo(
    () =>
      ((projects?.data?.length > 0 && projects.data[0].surveyGroups) || []).map((el) => ({
        title: el.surveyGroupName,
        value: el.surveyGroupId,
        label: el.surveyGroupName,
      })),
    [projects.timeStamp],
  );

  return (
    <Layout>
      <Loading visible={loading} />
      <div className="grid grid-cols-12 mb-10 mt-8">
        <div className="col-start-1 col-span-6 text-base text-body mb-3">Select Project</div>
        <Dropdown
          className="c-autocomplete col-start-1 col-span-12
          md:col-start-1 md:col-span-4 lg:col-start-1 lg:col-span-3 w-full"
          showSearch={false}
          type="gray"
          placeholder="Leadership Development"
          handleChange={(val) => setQuery({ surveyGroupId: val })}
          options={dropdownOptions}
        />
      </div>
      <Tabs>
        <TabPane tab="Top Leadership" key="top-leadership">
          <TopLeadership
            loading={loading}
            completionRate={completionRate}
            projects={projects}
            fetchCompletionRate={fetchCompletionRate}
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
  fetchCompletionRate: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
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
};

Dashboard.defaultProps = {
  completionRate: {},
  projects: {},
};

export default Dashboard;
