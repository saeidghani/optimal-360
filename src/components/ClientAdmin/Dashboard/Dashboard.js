import React, { useEffect } from 'react';
import { Tabs } from 'antd';

import PropTypes from 'prop-types';
import Layout from './Helper/Layout';

import TopLeadership from './TopLeadership/TopLeadership';
import Managers from './Managers/Managers';
import HighPotentials from './HighPotentials/HighPotentials';
import Loading from '../../Common/Loading';
import Dropdown from '../../Common/Dropdown';

const Dashboard = ({ loading, completionRate, fetchProjects, projects, fetchCompletionRate }) => {
  const [project, setProject] = React.useState('');

  const { TabPane } = Tabs;

  useEffect(() => {
    fetchProjects('');
  }, []);

  const dropdownOptions = React.useMemo(() => {
    if (projects?.data) {
      /* return (projects.data[0] || []).map((el) => ({
         title: el.name,
         value: el.id,
         label: el.name,
       })); */
    }
  }, [projects]);

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
          value={project}
          handleChange={(val) => setProject(val)}
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
    data: PropTypes.shape({}),
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
